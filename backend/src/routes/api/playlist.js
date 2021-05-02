import express from 'express';
import { Error } from 'mongoose';
import { retrieveRoom } from '../../rooms-data/rooms-dao';
import { addSong, retrieveAllSongs, retrieveSong, updateSong,deleteSong } from '../../rooms-data/songs-dao';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const router = express.Router();

router.post('/add/', async (req, res) => {
    const io = req.app.get('socketio');
    try{
        if (!req.body.roomid) {
            throw("Room ID not in request body");
        }
        const room = await retrieveRoom(req.body.roomid);
        if(room){
            if(room.password == req.body.password){
                const song = {
                    roomid: req.body.roomid,
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                    description: req.body.description,
                    channelTitle: req.body.channelTitle,
                    source: req.body.source,
                    publishTime: req.body.publishTime
                };
                if(song.roomid&&song.title&&song.content){
                    const newSong = await addSong(song);
                    res.status(HTTP_CREATED)
                    .json(newSong);

                    // broadcast new song

                    console.log(`Broadcasting new song ${newSong}`);
                    io.emit("FromAPI on addSong", newSong);

                }
                else{
                    res.sendStatus(HTTP_BAD_REQUEST);
                }
            }
            else{
                res.status(HTTP_UNAUTHORIZED).json('invalid password!');
            }
        }
        else{
            res.status(HTTP_NOT_FOUND).json('room not found!');
        }
    }catch(err){
        res.status(HTTP_BAD_REQUEST).json(err);
    }
});

router.post('/getall/', async (req, res) => {
    try{
        if (!req.body.roomid) {
            throw("Room ID not in request body");
        }
        const room = await retrieveRoom(req.body.roomid);

        if(room){
            if(room.password == req.body.password){
                const playlist = await retrieveAllSongs(room._id);
                res.json(playlist);
            }
            else{
                res.status(HTTP_UNAUTHORIZED).json('invalid password!');
            }
        }
        else{
            res.status(HTTP_NOT_FOUND).json('room not found!');
        }
    }catch(err){
        res.status(HTTP_BAD_REQUEST).json(err);
    }
});


router.post('/getone/', async (req, res) => {
    try{
        if (!req.body.roomid) {
            throw("Room ID not in request body");
        }
        const room = await retrieveRoom(req.body.roomid);

        if(room){
            if(room.password == req.body.password){
                const song = await retrieveSong(req.body.id);
                res.json(song);
            }
            else{
                res.status(HTTP_UNAUTHORIZED).json('invalid password!');
            }
        }
        else{
            res.status(HTTP_NOT_FOUND).json('room not found!');
        }
    }catch(err){
        res.status(HTTP_BAD_REQUEST).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
        if (!req.body.roomid) {
            throw("Room ID not in request body");
        }
        const room = await retrieveRoom(req.body.roomid);
        if(room){
            if(room.password == req.body.password){
                const song = {
                    _id: req.params,
                    roomid: req.body.roomid,
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                    description: req.body.description,
                    channelTitle: req.body.channelTitle,
                    source: req.body.source
                };

                const success = await updateSong(song);
                res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
            }
            else{
                res.status(HTTP_UNAUTHORIZED).json('invalid password!');
            }
        }
        else{
            res.status(HTTP_NOT_FOUND).json('room not found!');
        }
    }catch(err){
        res.status(HTTP_BAD_REQUEST).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        if (!req.body.roomid) {
            throw("Room ID not in request body");
        }
        const room = await retrieveRoom(req.body.roomid);
        if(room){
            if(room.password == req.body.password){
                const { id } = req.params;
                await deleteSong(id);
                res.sendStatus(HTTP_NO_CONTENT);
            }
            else{
                res.status(HTTP_UNAUTHORIZED).json('invalid password!');
            }
        }
        else{
            res.status(HTTP_NOT_FOUND).json('room not found!');
        }
    }catch(err){
        res.status(HTTP_BAD_REQUEST).json(err);
    }
});

export default router;

