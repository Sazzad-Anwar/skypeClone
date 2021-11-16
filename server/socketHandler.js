const socketHandler = (socket) => {
    console.log("New client connected", socket.id);
}

module.exports = socketHandler;