import { retrieveRoom } from "../rooms-data/rooms-dao";



export default async function onConnection(socket, io) {
    const { roomID, password } = socket.handshake.query;
    const room = await retrieveRoom(roomID);
    console.log('a user connected');
    if(room){
        if(room.password == password){
            socket.join(roomID);
            console.log(`user joined` + roomID);
        }
        else{

        }
    }
    else{

    }

    socket.on('update', () =>{
        console.log("update");
        io.to(roomID).emit('update');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

}