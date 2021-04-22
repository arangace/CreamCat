import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// Setup Express server
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

// Setup routes
import routes from './routes';
import connectToDatabase from './rooms-data/db-connect';
app.use('/', routes);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../../frontend/public')));

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

// Start the DB running. Then, once it's connected, start the server.
connectToDatabase()
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));
//app.listen(port, () => console.log(`App server listening on port ${port}!`));