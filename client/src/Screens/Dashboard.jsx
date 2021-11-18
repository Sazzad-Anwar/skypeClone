import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/Actions/LoginAction';
import { useNavigate } from 'react-router';
import WelcomePage from '../Components/WelcomePage';
import Chatting from './../Components/Chatting';
import SidePanel from '../Components/SidePanel';

const Dashboard = () => {
    const [socketId, setSocketId] = useState('');
    const [chatListHeight, setChatListHeight] = useState(0);
    const [userChatOpen, setUserChatOpen] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const featureHeight = useRef(null);

    useEffect(() => {
        let socket = io('/');

        if (featureHeight.current) {
            if (window.innerWidth > 991) {
                setChatListHeight(`calc(100vh - ${featureHeight.current.offsetHeight + 20}px)`);
            } else {
                setChatListHeight('auto');
            }
        }

        if (window.innerWidth < 992) {
            setIsMobileWidth(true);
        } else {
            setIsMobileWidth(false);
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < 992) {
                setIsMobileWidth(true);
            } else {
                setIsMobileWidth(false);
            }
        });

        socket.on('connect', () => {
            setSocketId(socket.id);
        });
    }, [dispatch]);

    // open a user chat
    const openUserChat = (userId) => {
        setUserChatOpen(true);
    };
    const closeUserChat = (userId) => {
        setUserChatOpen(false);
    };

    return (
        <div className="flex-col lg:flex-row flex overflow-hidden">
            {isMobileWidth && !userChatOpen ? (
                <SidePanel
                    dispatch={dispatch}
                    logOut={logOut}
                    navigate={navigate}
                    featureHeight={featureHeight}
                    user={user}
                    socketId={socketId}
                    chatListHeight={chatListHeight}
                    openUserChat={openUserChat}
                />
            ) : !isMobileWidth ? (
                <SidePanel
                    dispatch={dispatch}
                    logOut={logOut}
                    navigate={navigate}
                    featureHeight={featureHeight}
                    user={user}
                    socketId={socketId}
                    chatListHeight={chatListHeight}
                    openUserChat={openUserChat}
                />
            ) : null}

            {isMobileWidth && userChatOpen ? (
                <div className="w-screen h-screen dark:bg-black dark:text-white">
                    {userChatOpen ? (
                        <Chatting
                            image={`https://ui-avatars.com/api/?name=John+Doe`}
                            name={'John Doe'}
                            isActive={true}
                            openUserChat={openUserChat}
                            closeUserChat={closeUserChat}
                        />
                    ) : (
                        <WelcomePage img={user?.details?.photo} name={user?.details?.name} />
                    )}
                </div>
            ) : !isMobileWidth ? (
                <div className="w-screen h-screen dark:bg-black dark:text-white">
                    {userChatOpen ? (
                        <Chatting
                            image={`https://ui-avatars.com/api/?name=John+Doe`}
                            name={'John Doe'}
                            isActive={true}
                        />
                    ) : (
                        <WelcomePage img={user?.details?.photo} name={user?.details?.name} />
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Dashboard;
