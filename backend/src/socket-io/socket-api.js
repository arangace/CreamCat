import socketIo, { Server } from "socket.io";
import { deleteRoom, retrieveRoom, updateRoom } from "../rooms-data/rooms-dao";
import { deleteSong, retrieveAllSongs } from "../rooms-data/songs-dao";
import dayjs from 'dayjs';
import { response } from "express";

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
    retrieveRoom(roomID)
        .then((room) => {
            if (room && room.password == password) {
                socket.join(roomID);
                console.log(`Client joined room ${roomID}`);
            }

            // Increment room user count
            const userCount = room.userCount;
            const newUserCount = userCount + 1;
            if(newUserCount > 1){
                const newRoom = {
                _id: room._id,
                name: room.name,
                description: room.description,
                password: room.password,
                userCount: newUserCount,
                lastActive: '2077-02-21',
                }
            // Update database
                updateRoom(newRoom)
                    .then(() => {
                        console.log(
                            `Update successful. userCount: ${userCount}->${newUserCount}`
                        );
                    })
                    .catch((err) => {
                        console.log(`Failed to update room`);
                        console.log(err);
                    });
            }else{
                const newRoom = {
                    _id: room._id,
                    name: room.name,
                    description: room.description,
                    password: room.password,
                    userCount: newUserCount,
                    lastActive: room.lastActive
                    }
                // Update database
                    updateRoom(newRoom)
                        .then(() => {
                            console.log(
                                `Update successful. userCount: ${userCount}->${newUserCount}`
                            );
                        })
                        .catch((err) => {
                            console.log(`Failed to update room`);
                            console.log(err);
                        });
            }

        })
        .catch((err) => console.error(err));

    // Emit on connect message to client
    socket.emit("FromAPI on connect");

    // WARNING: password validation logic not implemented

    // Listen to song end event
    socket.on("song end", async (song) => {
        // pop song once
        console.log(`Song ended on ${song.roomID}`);
        console.log(song);

        try {
            if (!song.roomID) {
                throw "Room ID not in request body";
            }
            await retrieveRoom(song.roomID).then(async (room) => {
                if (room) {
                    if (room.password == password) {
                        await deleteSong(song._id).then(() => {
                            console.log(`Sending refetch event`);
                            io.emit("FromAPI refetch");
                        });
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    });

    // Listen to disconnect events
    socket.on("disconnect", () => onDisconnect(roomID));
}

// Callback function for disconnect events
async function onDisconnect(roomID) {
    console.log("Client disconnected");
    // Decrement room userCount
    try {
        // TODO: Possibly encapsulate operation into a function that also sends an update to all connected clients
        //       and check if updated userCount meets condition for room deletion

        const roomToUpdate = await retrieveRoom(roomID);
        const userCount = roomToUpdate.userCount;
        const newUserCount = userCount - 1;
        //being able to hangout with imaginary friends is gonna be a premium function -- Kevin
        if (newUserCount > 1) {
            const newRoom = {
                _id: roomToUpdate._id,
                name: roomToUpdate.name,
                description: roomToUpdate.description,
                password: roomToUpdate.password,
                userCount: newUserCount,
                lastActive: roomToUpdate.lastActive,
            }
            updateRoom(newRoom);

            console.log(
                `Update successful. userCount: ${userCount}->${newUserCount}`
            );
        } else {
            const lastActive = dayjs();
            const newRoom = {
                _id: roomToUpdate._id,
                name: roomToUpdate.name,
                description: roomToUpdate.description,
                password: roomToUpdate.password,
                userCount: newUserCount,
                lastActive: lastActive,
            }
            await updateRoom(newRoom);
            console.log("room stale");
        }
    } catch (err) {
        console.log(`Failed to update room`);
        console.log(err);
    }
}
