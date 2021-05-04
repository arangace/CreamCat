import { Room } from "./rooms-schema";



export async function createRoom(room) {
    const dbRoom = new Room(room);
    await dbRoom.save();
    return dbRoom;
}

export async function retrieveRoom(id) {
    return await Room.findById(id);
}

export async function updateRoom(room) {
    const dbRoom = await Room.findById(room._id);
    if(dbRoom) {
        if(room.name){
            dbRoom.name = room.name;
        }
        dbRoom.description = room.description;
        dbRoom.password = room.password;
        dbRoom.userCount = room.userCount;

        await dbRoom.save();
        return true;
    }
    return false;
}

export async function deleteRoom(id) {
    await Room.deleteOne({_id:id});
}