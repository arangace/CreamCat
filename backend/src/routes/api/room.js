import express from 'express';
import { createRoom, deleteRoom, retrieveRoom, updateRoom } from '../../rooms-data/rooms-dao';
import dayjs from 'dayjs';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.post('/start/', async (req, res) => {
    try{
        console.log(req.body);
        const roomToUpdate = await retrieveRoom(req.body.roomID);
        if(roomToUpdate.startTime < roomToUpdate.endTime){
            const newRoom = {
                ...roomToUpdate._doc,
                startTime: dayjs()
            };
            await updateRoom(newRoom);
            res.json(0);
        }
        else{
            const elapsedTime = dayjs().diff(roomToUpdate.startTime, 'seconds');
            console.log(elapsedTime);
            res.json(elapsedTime);
        }
    }catch (err) {
        console.log(err);
    }
});


router.post('/end/', async (req, res) => {
    try{
        const roomToUpdate = await retrieveRoom(req.body.roomID);
        if(room.endTime < room.startTime){
            const newRoom = {
                ...room._doc,
                endTime: dayjs()
            };
            await updateRoom(newRoom);
            res.sendStatus(HTTP_NO_CONTENT);
        }
        else{
            const elapsedTime = dayjs().diff(roomToUpdate.startTime, 'seconds');
            console.log(elapsedTime);
            res.json(elapsedTime);
        }
    }catch (err) {
        console.log(err);
    }
});

router.post('/create/', async (req, res) => {
    try{
        const room = {
            name: req.body.name,
            description: req.body.description,
            password: req.body.password,
            userCount: 0,
            lastActive: dayjs(),
            startTime: dayjs().add(-2, 'day'),
            endTime: dayjs().add(-1, 'day')
        };

        if(room.name){
            const newRoom = await createRoom(room);
            res.status(HTTP_CREATED)
            .header('Location', `/${newRoom._id}`)
            .json(newRoom);
        }
        else{
            res.json('Room name is required!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.post('/join/', async (req, res) => {
    try{
        const id = req.body._id;
        const password = req.body.password;

        console.log(`Join room requested for ${id}`)
        if(id){
            const room = await retrieveRoom(id);
            if(room){
                if(room.password){
                    if(room.password == password){
                        res.header('Location', `/${room._id}`)
                    .json(room);
                    }
                    else{
                        res.json('Password incorrect!');
                        console.log()
                    }
                }
                else{
                    res.header('Location', `/${room._id}`)
                    .json(room);
                }
            }
            else{
                res.json('Room not found!');
            }
        }
        else{
            res.json('Room ID is required!')
        }
    }catch{
        res.json('Room not found!');
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const dbroom = await retrieveRoom(id);
        if(dbroom){
            if(room.password == req.body.oldpassword){
                const { id } = req.params;
                const room = {
                    name: req.body.name,
                    description: req.body.description,
                    password: req.body.password
                };
                room._id = id;
                const success = await updateRoom(room);
                res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
            }
            else{
                res.json('Password incorrect!');
            }
        }
        else{
            res.json('Room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const dbroom = await retrieveRoom(id);
        if(room){
            if(room.password == req.body.password){
                await deleteRoom(id);
                res.sendStatus(HTTP_NO_CONTENT);
            }
            else{
                res.json('Password incorrect!');
            }
        }
        else{
            res.json('Room not found!');
        }
    }catch{
        res.sendStatus(HTTP_BAD_REQUEST);
    }  
});

export default router;