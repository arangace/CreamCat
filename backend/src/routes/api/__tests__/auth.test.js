import mongoose from 'mongoose';
import connectToDatabase from '../../../rooms-data/db-connect';
import router from '../auth';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import axios from 'axios';
import { Room } from '../../../rooms-data/rooms-schema';

let mongod, app, server;
let room1, room2, room3;



beforeAll(async done => {

    mongod = new MongoMemoryServer();

    await mongod.getUri().then(cs => connectToDatabase(cs));
   
    app = express();
    app.use(express.json());
    app.use('/', router);
    server = app.listen(3000, () => done());

});

afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

beforeEach(async () => {
    room1 = {
        name: '123'
    };

    room2 = {
        name: '1234',
        description: 'aaa',
        password: 'abc'
    };

    room3 = {
        name: '123'
    }

    const dbroom1 = new Room(room1);
    room1._id = dbroom1._id;
    dbroom1.save();

    const dbroom2 = new Room(room2);
    room2._id = dbroom2._id;
    dbroom2.save();

    const dbroom3 = new Room(room3);
    room3._id = dbroom3._id;
    
});

it('Join an existing room without password', async () => {
    const rqroom = {
        ...room1
    }

     const response = await axios.post('http://localhost:3000/', rqroom);
     const rsroom = response.data;
     expect(rsroom.name).toBe('123');
});

it('Join an existing room without password', async () => {
    const rqroom = {
        ...room2
    }

     const response = await axios.post('http://localhost:3000/', rqroom);
     const rsroom = response.data;
     expect(rsroom.name).toBe('1234');
     expect(rsroom.description).toBe('aaa');
});

it('Join an existing room without wrong password', async () => {
    const rqroom = {
        ...room2,
        password: '123'
    }

     const response = await axios.post('http://localhost:3000/', rqroom);
     const rsroom = response.data;
     expect(rsroom).toBe('password incorrect!');
     expect(rsroom.name).toBe(undefined);
});

it('Join an unexisting room', async () => {
    const rqroom = {
        ...room3
    }

     const response = await axios.post('http://localhost:3000/', rqroom);
     const rsroom = response.data;
     expect(rsroom).toBe('room not found!');
     expect(rsroom.name).toBe(undefined);
});