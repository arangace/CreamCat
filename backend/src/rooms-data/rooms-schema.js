import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    password: String,
    userCount: String

    // playList: [{
    //     image: String,
    //     title: String,
    //     artist: String,
    //     album: String,
    //     length: String,
    //     source: String
    // }]
}, {
    timestamps: {}
});

const Room = mongoose.model('Room', roomSchema);

export { Room };