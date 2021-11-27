import { io } from 'socket.io-client';
import React, { createContext } from 'react';

const socket = io('http://localhost:3000');

const SocketContext = createContext(socket);
socket.on('connect', () => {
    console.log('connected to socket');
    console.log(socket.connected);
});

const SocketProvider = ({ children }) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
