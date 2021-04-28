import express from 'express';
import { retrieveRoom } from '../../rooms-data/rooms-dao';
import { addSong, retrieveAllSongs, retrieveSong, updateSong,deleteSong } from '../../rooms-data/songs-dao';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.post('/add/', async (req, res) => {
    try{
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
                }
                else{
                    res.sendStatus(HTTP_BAD_REQUEST);
                }
            }
            else{
                res.json('invalid password!');
            }
        }
        else{
            res.json('room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.post('/getall/', async (req, res) => {
    try{

        const room = await retrieveRoom(req.body.roomid);

        if(room){
            if(room.password == req.body.password){
                const playlist = await retrieveAllSongs(room._id);
                res.json(playlist);
            }
            else{
                res.json('invalid password!');
            }
        }
        else{
            res.json('room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});


router.post('/getone/', async (req, res) => {
    try{

        const room = await retrieveRoom(req.body.roomid);

        if(room){
            if(room.password == req.body.password){
                const song = await retrieveSong(req.body.id);
                res.json(song);
            }
            else{
                res.json('invalid password!');
            }
        }
        else{
            res.json('room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.put('/:id', async (req, res) => {
    try{
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
                res.json('invalid password!');
            }
        }
        else{
            res.json('room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const room = await retrieveRoom(req.body.roomid);
        if(room){
            if(room.password == req.body.password){
                const { id } = req.params;
                await deleteSong(id);
                res.sendStatus(HTTP_NO_CONTENT);
            }
            else{
                res.json('invalid password!');
            }
        }
        else{
            res.json('room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }


});

export default router;

