import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const songSchema = new Schema({
    roomid: {type: String, required: true},
    image: String,
    title: {type: String, required: true},
    description: String,
    publishTime: Date,
    content: {type: String, required: true},
    channelTitle: String,
    source: String
}, {
    timestamps: {}
});

const Song = mongoose.model('Song', songSchema);

export { Song };