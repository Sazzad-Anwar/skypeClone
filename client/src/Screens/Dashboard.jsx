import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import DarkModeToggler from '../Components/DarkModeToggler';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [socketId, setSocketId] = useState('');

    useEffect(() => {
        let socket = io('/');

        socket.on('connect', () => {
            setSocketId(socket.id);
        });
    }, []);

    return (
        <div className="dark:bg-gray-900 bg-white h-screen w-screen dark:text-white">
            <div className="flex justify-end items-center mt-5">
                <DarkModeToggler />
            </div>
            <div className="flex justify-center items-center">
                <div className="">
                    <h1>Hello user number {socketId}</h1>
                    <Link to="/">Logout</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
