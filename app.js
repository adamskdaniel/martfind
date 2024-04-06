import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/martfind';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(db);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
    startServer();
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use('/', router);
app.get('*', (req, res) => {
    res.send('Page not found');
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`App is listening at http://localhost:${port}`);
    });
};




// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import router from './routes/index.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 1080;
// const db = process.env.MONGODB_URI || 'mongodb://localhost/martfind';


// // Apply body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect(db);

// mongoose.connection.on('connected', () => {
//     console.log('MongoDB connected');
//     // Start the Express server
//     startServer();
// });

// mongoose.connection.on('error', (err) => {
//     console.error('Error connecting to MongoDB:', err);
// });

// // Your route handling code
// app.use('/', router);
// app.get('*', (req, res) => {
//     res.send('Page not found');
// });

// // Function to start the Express server
// const startServer = () => {
//     app.listen(port, () => {
//         console.log(`App is listening at http://localhost:${port}`);
//     });
// };