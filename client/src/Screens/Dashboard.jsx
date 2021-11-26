import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/Actions/LoginAction';
import WelcomePage from '../Components/WelcomePage';
import Chatting from './../Components/Chatting';
import SidePanel from '../Components/SidePanel';
import RightSidePanel from '../Components/RightSidePanel';
import { userDetails } from './../Redux/Actions/UserAction';

const Dashboard = () => {
    const socket = useRef(null);
    const [chatListHeight, setChatListHeight] = useState(0);
    const [userChatOpen, setUserChatOpen] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const user = useSelector((state) => state.user);
    const details = useSelector((state) => state.details);
    const dispatch = useDispatch();
    const featureHeight = useRef(null);
    const [userList, setUserList] = useState([]);
    const [chattingUserDetails, setChattingUserDetails] = useState({});

    useEffect(() => {
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

        dispatch(userDetails(user?.details?._id));
    }, [dispatch, user?.details?._id]);

    //*---- Socket connections ----*//
    useEffect(() => {
        //initialize socket
        socket.current = io('/');

        //On connection to server the user id will be sent to server and the user will be added to the user list
        socket.current.on('connect', () => {
            // the user id is sent to the server while connected
            socket.current.emit('new-user', { _id: user?.details?._id });
        });

        return () => {
            //disconnect socket connection on component unmount
            socket.current.disconnect();
        };
    }, [socket, user?.details?._id]);

    useEffect(() => {
        //listen for new user list when a new user joins
        socket.current.on('user-connected', (users) => {
            //filter the user list to remove the current user
            setUserList(users.filter((u) => u._id !== user?.details?._id));
        });

        return () => {
            //disconnect socket connection on component unmount
            socket.current.off();
        };
    }, [user?.details?._id, userList]);

    // open a user chat
    const openUserChat = (userId) => {
        setUserChatOpen(true);
    };
    const closeUserChat = (userId) => {
        setUserChatOpen(false);
    };

    const toggleRightSidePanel = () => {
        setShowFiles(!showFiles);
    };

    const chattingUser = (user) => {
        setChattingUserDetails(userList.find((u) => u._id === user._id));
    };

    return (
        <div className="flex-col lg:flex-row flex overflow-hidden">
            {isMobileWidth && !userChatOpen ? (
                <SidePanel
                    dispatch={dispatch}
                    logOut={logOut}
                    featureHeight={featureHeight}
                    user={details}
                    chatListHeight={chatListHeight}
                    openUserChat={openUserChat}
                    userList={userList}
                    chattingUser={chattingUser}
                />
            ) : !isMobileWidth ? (
                <SidePanel
                    dispatch={dispatch}
                    logOut={logOut}
                    featureHeight={featureHeight}
                    user={details?.details}
                    chatListHeight={chatListHeight}
                    openUserChat={openUserChat}
                    userList={userList}
                    chattingUser={chattingUser}
                />
            ) : null}

            {isMobileWidth && userChatOpen ? (
                <div className="w-screen h-screen dark:bg-black dark:text-white">
                    {userChatOpen ? (
                        <Chatting
                            chattingUser={chattingUserDetails}
                            isActive={true}
                            openUserChat={openUserChat}
                            closeUserChat={closeUserChat}
                        />
                    ) : (
                        <WelcomePage img={details?.details?.photo} name={details?.details?.name} />
                    )}
                </div>
            ) : !isMobileWidth ? (
                <div className="w-screen h-screen dark:bg-black dark:text-white">
                    {userChatOpen ? (
                        <Chatting
                            chattingUser={chattingUserDetails}
                            isActive={true}
                            toggleRightSidePanel={toggleRightSidePanel}
                        />
                    ) : (
                        <WelcomePage img={details?.details?.photo} name={details?.details?.name} />
                    )}
                </div>
            ) : null}

            {showFiles && (
                <div
                    className={` transition-all absolute right-0 w-full lg:w-72 top-0 ease-in-out h-screen duration-1000 dark:bg-gray-900 dark:text-white border dark:border-gray-900 overflow-hidden z-10 bg-white`}
                >
                    <RightSidePanel toggleRightSidePanel={toggleRightSidePanel} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
