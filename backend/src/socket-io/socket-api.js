import socketIo, { Server } from "socket.io";
import { retrieveRoom, updateRoom } from "../rooms-data/rooms-dao";
import { deleteSong, retrieveAllSongs } from "../rooms-data/songs-dao";

export default function createSocketIoConnection(server) {
    const io = socketIo(server);

    // Listen to connection events on socket
    io.on("connection", (socket) => onConnection(socket));
    return io;
}
// Callback function for connection event
async function onConnection(socket) {
    console.log(`New client connected`);

    // Retrieve Room ID from client handshake query
    const { roomID, password } = socket.handshake.query;
    retrieveRoom(roomID)
        .then((room) => {
            if (room && room.password == password) {
                socket.join(roomID);
                console.log(`Client joined room ${roomID}`);
            }
        })
        .catch((err) => console.error(err));

    // WARNING: password validation logic not implemented

    // TODO: update database

    /** Uncomment when rooms schema matches. Needs extra field: userCount
     * // Increment room user count
     * try {
     *
     *     // TODO: Possibly encapsulate operation into a function that also sends an update to all connected clients
     *
     *     const roomToUpdate = retrieveRoom(roomID);
     *     const userCount = roomToUpdate.userCount;
     *     const newUserCount = userCount + 1;
     *     const newRoom = { ...roomToUpdate, userCount: newUserCount };
     *     updateRoom(roomID, newRoom);
     *
     *     console.log(`Update successful. userCount: ${userCount}->${newUserCount}`)
     * } catch (err) {
     *     console.log(`Failed to update room`);
     *     console.log(err);
     * }
     */

    // Construct response data that will be sent to the client
    const responseData = {
        // userCount: newUserCount,
        userCount: 1, //WARNING: placeholder userCount. Replace with the line above when userCount implemented
    };

    // Emit response data to client
    socket.emit("FromAPI on connect", responseData);

    // Listen to song end event
    socket.on("song end", async (song) => {
        // pop song once
        console.log(`Song ended on ${song.roomid}`);
        console.log (song)

        try {
            if (!song.roomid) {
                throw "Room ID not in request body";
            }
                await retrieveRoom(song.roomid).then( async room => {
                if (room) {
                    if (room.password == password) {
                        await deleteSong(song._id).then(() => {
                            console.log(`Sending refetch event`);
                            socket.emit("FromAPI refetch");
                        });
                    }
                }
            })
            
        } catch (err) {
            console.log(err);
        }
    });

    // Listen to disconnect events
    socket.on("disconnect", () => onDisconnect(roomID));
}

// Callback function for disconnect events
function onDisconnect(roomID) {
    console.log("Client disconnected");

    /** Uncomment when rooms schema matches. Needs extra field: userCount
     * // Decrement room userCount
     * try {
     *
     *     // TODO: Possibly encapsulate operation into a function that also sends an update to all connected clients
     *     //       and check if updated userCount meets condition for room deletion
     *
     *     const roomToUpdate = retrieveRoom(roomID);
     *     const userCount = roomToUpdate.userCount;
     *     const newUserCount = userCount - 1;
     *     const newRoom = { ...roomToUpdate, userCount: newUserCount };
     *     updateRoom(roomID, newRoom);
     *
     *     console.log(`Update successful. userCount: ${userCount}->${newUserCount}`)
     * } catch (err) {
     *     console.log(`Failed to update room`);
     *     console.log(err);
     * }
     */
}
