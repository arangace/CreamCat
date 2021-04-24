import express from 'express';
import { createRoom, deleteRoom, retrieveRoom, updateRoom } from '../../rooms-data/rooms-dao';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.post('/create/', async (req, res) => {
    const room = {
        name: req.body.name,
        description: req.body.description,
        password: req.body.password

    };

    if(room.name){
        const newRoom = await createRoom(room);
        res.status(HTTP_CREATED)
        .header('Location', `/${newRoom._id}`)
        .json(newRoom);
    }
    else{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.post('/join/', async (req, res) => {
    const id = req.body._id;
    const password = req.body.password;

    const room = await retrieveRoom(id);
    if(room){
        if(room.password){
            if(room.password == password){
                res.header('Location', `/${room._id}`)
            .json(room);
            }
            else{
                res.json('password incorrect!');
            }
        }
        else{
            res.header('Location', `/${room._id}`)
            .json(room);
        }
    }
    else{
        res.json('room not found!');
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const room = req.body;
        room._id = id;
        const success = await updateRoom(room);
        res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await deleteRoom(id);
        res.sendStatus(HTTP_NO_CONTENT);
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }  
});

export default router;