import { Server } from 'socket.io';
import { retrieveRoom, updateRoom } from "../rooms-data/rooms-dao";
import { retrieveAllSongs } from "../rooms-data/songs-dao";


// Callback function for connection event
export default async function onConnection(socket) {
    console.log(`New client connected`);

    // Retrieve Room ID from client handshake query
    const { roomID, password } = socket.handshake.query;
    console.log (`Room ID: ${roomID}`);

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

    // Try get all songs in database with the provided Room ID
    let playlist;
    try {
        playlist = await retrieveAllSongs(roomID);
          console.log(`${playlist.length} songs found`);

    } catch (err) {
        console.log(`Failed to get playlist. RoomID: ${roomID}`);
        console.log(err);
    }

    // Construct response data that will be sent to the client
    const responseData = {
        playlist: playlist,      
        // userCount: newUserCount,
        userCount: 1, //WARNING: placeholder userCount. Replace with the line above when userCount implemented
    };

    // Emit response data to client
    socket.emit("FromAPIOnConnect", responseData);

    //Listen to disconnect events
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
