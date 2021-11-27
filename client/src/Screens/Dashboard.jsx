import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/Actions/LoginAction';
import WelcomePage from '../Components/WelcomePage';
import Chatting from './../Components/Chatting';
import SidePanel from '../Components/SidePanel';
import RightSidePanel from '../Components/RightSidePanel';
import { userDetails } from './../Redux/Actions/UserAction';
import { chatUsersAction } from './../Redux/Actions/ChatUsersAction';
// import { io } from 'socket.io-client';
// import { SocketContext } from '../Components/Socket';
import { socketAction } from '../Components/socketRedux';

const Dashboard = () => {
    const [chatListHeight, setChatListHeight] = useState(0);
    const [userChatOpen, setUserChatOpen] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const user = useSelector((state) => state.user);
    const details = useSelector((state) => state.details);
    // const socket = useContext(SocketContext);
    // const socket = useRef(null);
    const socket = useSelector((state) => state.socket);
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

        dispatch(userDetails(user?._id));
        dispatch(socketAction());
    }, [dispatch, user._id]);

    //*---- Socket connections ----*//
    useEffect(() => {
        //initialize socket
        // socket.current = io('/');
        if (Object.keys(socket).length) {
            //On connection to server the user id will be sent to server and the user will be added to the user list
            // socket.on('connect', () => {
            // the user id is sent to the server while connected
            socket.emit('new-user', { _id: user._id });
            // });

            return () => {
                //disconnect socket connection on component unmount
                socket.disconnect();
            };
        }
    }, [dispatch, socket, user._id]);

    useEffect(() => {
        //listen for new user list when a new user joins
        if (Object.keys(socket).length) {
            socket.on('user-connected', (users) => {
                //filter the user list to remove the current user
                setUserList(users.filter((u) => u._id !== user._id));

                //Add and update the userlist to the redux store
                dispatch(chatUsersAction(users.filter((u) => u._id !== user._id)));

                if (!users.filter((u) => u._id === chattingUserDetails?._id).length) {
                    setUserChatOpen(false);
                }
            });

            return () => {
                //disconnect socket connection on component unmount
                socket.off();
            };
        }
    }, [chattingUserDetails, dispatch, socket, user._id]);

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
                    chatUsers={userList}
                    featureHeight={featureHeight}
                    chatListHeight={chatListHeight}
                    openUserChat={openUserChat}
                    chattingUser={chattingUser}
                />
            ) : !isMobileWidth ? (
                <SidePanel
                    dispatch={dispatch}
                    logOut={logOut}
                    chatUsers={userList}
                    featureHeight={featureHeight}
                    chatListHeight={chatListHeight}
                    openUserChat={openUserChat}
                    chattingUser={chattingUser}
                />
            ) : null}

            {isMobileWidth && userChatOpen ? (
                <div className="w-screen h-screen dark:bg-black dark:text-white">
                    {userChatOpen ? (
                        <Chatting
                            chattingUser={chattingUserDetails}
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
