import express from 'express';
import { retrieveRoom } from '../../rooms-data/rooms-dao';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

router.post('/', async (req, res) => {
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
export default router;