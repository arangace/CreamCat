import express from 'express';
import path from 'path';

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

// Start the server.
app.listen(port, () => console.log(`App server listening on port ${port}!`));