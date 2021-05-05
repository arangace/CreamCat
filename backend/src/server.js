import express from 'express';
import connectToDatabase from './rooms-data/db-connect';
import path from 'path';
import dayjs from 'dayjs';

// Setup Express server
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

// Setup routes
import routes from './routes';
app.use('/', routes);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../../frontend/public')));

async function clearStaleRoom(){
    const staleRooms = await deleteStaleRooms(dayjs().add(-1, 'hour'));
    console.log(staleRooms);
    // console.log(dayjs().add(-1, 'hour').format('YYYY-MM-DD HH:mm:ss'));
    // const time1 = dayjs('2021-05-05');
    // const time2 = dayjs();
    // const diff = time1.diff(time2, 'seconds');
    // console.log(diff);
}

setInterval(clearStaleRoom, 60000);

// When running in production mode
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make build folder public
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    // Serve up index.html by default
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
}

// Setup socket.io server
import http from 'http';
import socketIo from 'socket.io';
import onConnection from './socket-io/socket-api';
import createSocketIoConnection from './socket-io/socket-api';
import { deleteStaleRooms } from './rooms-data/rooms-dao';
const server = http.createServer(app);
const io = createSocketIoConnection(server);
app.set('socketio', io);

// Start the DB running. Then, once it's connected, start the server.
connectToDatabase()
    .then(() => server.listen(port, () => console.log(`App server listening on port ${port}!`)));
//app.listen(port, () => console.log(`App server listening on port ${port}!`));