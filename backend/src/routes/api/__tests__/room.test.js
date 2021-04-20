import mongoose from 'mongoose';
import connectToDatabase from '../../../rooms-data/db-connect';
import router from '../room';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import axios from 'axios';
import { Room } from '../../../rooms-data/rooms-schema';

let mongod, app, server;


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

it('Create a new room without password or description', async () => {
    const room = {
        name: '123'
    };

     const response = await axios.post('http://localhost:3000/', room);
     expect(response.status).toBe(201);
     const rsroom = response.data;
     expect(rsroom.name).toBe('123');

     const dbroom = await Room.findById(rsroom._id);
     expect(dbroom.name).toBe('123');
});

it('Create a new room with password and description', async () => {
    const room = {
        name: '123',
        description: 'abc',
        password: 'aaa'
    };

     const response = await axios.post('http://localhost:3000/', room);
     expect(response.status).toBe(201);
     const rsroom = response.data;
     expect(rsroom.name).toBe('123');
     expect(rsroom.description).toBe('abc');
     expect(rsroom.password).toBe('aaa');

     const dbroom = await Room.findById(rsroom._id);
     expect(dbroom.name).toBe('123');
     expect(dbroom.description).toBe('abc');
     expect(dbroom.password).toBe('aaa');
});