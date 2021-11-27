const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const socketHandler = require('./socketHandler');
const connectDB = require('./configuration/db/connection');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const httpServer = createServer(app);
const morgan = require('morgan');
require('dotenv').config();
require('colors')
const io = new Server(httpServer, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }
});

connectDB('skypeClone');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.static('build'));
app.use('/api/v1', require('./Routes'));

//Making a socket instance
const socketIoInstance = socket => {
    socketHandler(io, socket)
}

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

//Passing the socket instance to the socket handler
io.on("connection", socketIoInstance);


httpServer.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});