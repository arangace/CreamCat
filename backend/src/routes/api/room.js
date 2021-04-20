import express from 'express';
import { createRoom } from '../../rooms-data/rooms-dao';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.post('/', async (req, res) => {
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





export default router;