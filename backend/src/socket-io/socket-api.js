import socketIo, { Server } from "socket.io";
import { deleteRoom, retrieveRoom, updateRoom } from "../rooms-data/rooms-dao";
import { deleteSong, retrieveAllSongs } from "../rooms-data/songs-dao";
import dayjs from "dayjs";

export default function createSocketIoConnection(server) {
    const io = socketIo(server);

    // Listen to connection events on socket
    io.on("connection", (socket) => onConnection(socket, io));
    return io;
}
// Callback function for connection event
async function onConnection(socket, io) {
    console.log(`New client connected`);

    // Retrieve Room ID from client handshake query
    const { roomID, password } = socket.handshake.query;

    try {
        const roomToUpdate = await retrieveRoom(roomID);
        if (roomToUpdate && roomToUpdate.password == password) {
            socket.join(roomID);
            console.log(`Client joined room ${roomID}`);
            // Increment room user count
            const userCount = roomToUpdate.userCount;
            const newUserCount = userCount + 1;
            const lastActive =
                newUserCount > 0 ? "2077-02-21" : roomToUpdate.lastActive;
            const newRoom = {
                ...roomToUpdate._doc,
                userCount: newUserCount,
                lastActive: lastActive,
            };
            await updateRoom(newRoom);
            console.log(`Update successful. userCount: ${newUserCount}`);
            // Emit on connect message to client
            socket.emit("Connected");
            io.emit("Update userCount", newUserCount);
        }
    } catch (err) {
        console.log(`Failed to update room`);
        console.log(err);
    }

    // Listen to song end events
    socket.on("Song ended", (song) => onSongEnded(song));

    // Listen to vote events
    socket.on("Vote", (payload) => onVote(io, payload));

    // Listen to disconnect events
    socket.on("disconnect", () => onDisconnect(io, roomID));
}
// Callback function for add song events
async function onSongEnded(song) {
    console.log(`Song ended on ${song.roomID}`);
    console.log(song);

    try {
        if (!song.roomID) {
            throw "Room ID missing";
        }
        await retrieveRoom(song.roomID).then(async (room) => {
            if (room) {
                if (room.password == password) {
                    await deleteSong(song._id).then(() => {
                        console.log(`Sending refetch event`);
                        io.emit("Refetch");
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

// Callback function for vote events
async function onVote(io, payload) {
    // voteType: skip, play, pause
    // vote: for vote = true, against vote = false
    const { roomID, password, voteType, vote } = payload;
    console.log(
        `Vote received. roomID: ${roomID}. voteType: ${voteType}, vote: ${vote} `
    );

    // Vote timeout in seconds
    const timeout = 15000;
    try {
        const votingRoom = await retrieveRoom(roomID);

        const userCount = votingRoom.userCount;

        // action: start, update, passed, fail
        let action, voteCount, newRoom, timer;

        if (votingRoom && votingRoom.password == password) {
            if (!["skip", "play", "pause"].includes(voteType)) {
                console.log(
                    `Unhandled vote event (outside of case). roomID: ${roomID}. voteType: ${voteType}, vote: ${vote}`
                );
            }
            const { voting } = votingRoom;
            let timer;
            if (!voting[voteType].count) {
                // Initialize vote if room is not voting skip
                action = "start";
                if (vote) {
                    // Increment voteSkipCount on a "for" vote
                    voteCount = voting[voteType].count + 1;
                    if (voteIsSuccessful(userCount, voteCount)) {
                        action = "passed";
                    }
                    timer = voteTimeout(
                        io,
                        roomID,
                        timeout,
                        voteType,
                        voteCount,
                        userCount
                    );
                } else {
                    console.log(
                        `[Unhandled vote] Against vote received before vote began`
                    );
                    return;
                }
            } else {
                // Update vote if room is voting skip
                action = "update";
                if (vote) {
                    // Increment voting.skip on a "for" vote
                    voteCount = voting[voteType].count + 1;
                    if (voteIsSuccessful(userCount, voteCount)) {
                        clearTimeout(timer);
                        action = "passed";
                    }
                } else {
                    // Decrement voting.skip on an "against" vote
                    voteCount = voting[voteType].count - 1;
                    // Fail vote if voteCount < 0 and set voting.skip to null
                    if (voteCount < 1) {
                        action = "fail";
                    }
                }
            }

            payload = {
                action: action,
                voteType: voteType,
                voteCount: voteCount,
                userCount: userCount,
            };
            console.log(payload);

            // Room object with updated voting.skip
            newRoom = {
                ...votingRoom._doc,
            };

            // reset voting properties to null if vote passed
            if (action == "passed") {
                newRoom.voting[voteType].count = null;
                newRoom.voting[voteType].lastPassed = dayjs();
            } else {
                newRoom.voting[voteType].count = voteCount;
            }

            await updateRoom(newRoom);
            console.log(`Update successful`);

            io.emit("Vote", payload);
        }
    } catch (err) {
        console.log(`Failed to update room`);
        console.log(err);
    }
}

// Callback function for disconnect events
async function onDisconnect(io, roomID) {
    console.log("Client disconnected");
    // Decrement room userCount
    try {
        const roomToUpdate = await retrieveRoom(roomID);
        const userCount = roomToUpdate.userCount;
        const newUserCount = userCount - 1;

        //being able to hangout with imaginary friends is gonna be a premium function -- Kevin
        const lastActive = newUserCount > 0 ? roomToUpdate.lastActive : dayjs();
        const newRoom = {
            ...roomToUpdate._doc,
            userCount: newUserCount,
            lastActive: lastActive,
        };
        await updateRoom(newRoom);
        io.emit("Update userCount", newUserCount);
        console.log(`Update successful. userCount: ${newUserCount}`);
        if (newUserCount < 1) {
            console.log(`Room ${roomID} is inactive`);
        }
    } catch (err) {
        console.log(`Failed to update room`);
        console.log(err);
    }
}

function voteIsSuccessful(userCount, voteCount) {
    // vote success conditions
    // Over 75% users vote for
    if (voteCount > userCount * 0.75) {
        console.log(`Vote passed: ${voteCount}/${userCount}`);
        return true;
    } else {
        return false;
    }
}

function voteTimeout(io, roomID, timeout, voteType, voteCount, userCount) {
    setTimeout(async () => {
        const votingRoom = await retrieveRoom(roomID);
        const { voting } = votingRoom;
        if (voting[voteType].count > 0) {
            const lastPassed = voting[voteType].lastPassed;
            // Fail code if 
            if (
                lastPassed == null ||
                lastPassed.isBefore(dayjs().add(-timeout, "millisecond"))
            ) {
                console.log("Vote timed out");
                const payload = {
                    action: `fail`,
                    voteType: voteType,
                    voteCount: voteCount,
                    userCount: userCount,
                };

                const newRoom = {
                    ...votingRoom._doc,
                };

                // reset voting properties to null if vote failed
                newRoom.voting[voteType].count = null;

                await updateRoom(newRoom);
                console.log(`Update successful`);
                io.emit("Vote", payload);
            }
        } else {
            console.log(`Vote succeeded. Timeout cancelled.`);
        }
    }, timeout);
}
