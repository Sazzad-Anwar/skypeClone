const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const socketHandler = require('./socketHandler');
const app = express();
const port = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://localhost:5000",
        methods: ["GET", "POST"]
    }
});


io.on("connection", socketHandler);


httpServer.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})