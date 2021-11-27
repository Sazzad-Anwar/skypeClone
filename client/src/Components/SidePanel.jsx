import { Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatUser from './ChatUser';
import DarkModeToggler from './DarkModeToggler';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { SocketContext } from './Socket';

const SidePanel = ({
    logOut,
    featureHeight,
    chatListHeight,
    chatUsers,
    openUserChat,
    chattingUser,
}) => {
    const [status, setStatus] = useState('Active');
    const [onlineStatus, setOnlineStatus] = useState('active');
    const [activeNav, setActiveNav] = useState('chat');
    const navigate = useNavigate();
    const { details } = useSelector((state) => state.details);
    // const socket = useContext(SocketContext);
    const socket = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    // const messages = useSelector((state) => state.messages);
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        let audio = new Audio('/message.mp3');
        if (Object.keys(socket).length) {
            socket.on('messageSent', (message) => {
                if (
                    (details && details.email === message.receiver) ||
                    (details && details.email === message.sender)
                ) {
                    setMessageList((prevChatList) => [...prevChatList, message]);
                    if (details && details.email === message.receiver) {
                        audio.play();
                    }
                    // audio.play();
                }
            });
            return () => {
                socket.off();
            };
        }
    }, [details, socket]);

    const menu = (
        <Menu className="dark:bg-gray-800">
            <Menu.Item key="setting" className="dark:text-white dark:hover:text-black">
                <Link to="/setting">Setting</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dark:text-white dark:hover:text-black">
                <p
                    className="cursor-pointer mb-0"
                    onClick={() => {
                        dispatch(logOut());
                        navigate('/');
                    }}
                >
                    Logout
                </p>
            </Menu.Item>
        </Menu>
    );

    const statusDropDown = (
        <Menu className="dark:bg-gray-800">
            <Menu.Item key="Be right back" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Be right back')}>Be right back</p>
            </Menu.Item>
            <Menu.Item key="Out of lunch" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Out of lunch')}>Out of lunch</p>
            </Menu.Item>
            <Menu.Item key="Out for lunch" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Out for lunch')}>Out for lunch</p>
            </Menu.Item>
            <Menu.Item key="In meetings" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('In meetings')}>In meetings</p>
            </Menu.Item>
            <Menu.Item key="At school" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('At school')}>At school</p>
            </Menu.Item>
            <Menu.Item key="At the movies" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('At the movies')}>At the movies</p>
            </Menu.Item>
            <Menu.Item key="Working from home" className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Working from home')}>Working from home</p>
            </Menu.Item>
        </Menu>
    );

    const onlineStatusDropDown = (
        <Menu className="dark:bg-gray-800">
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p
                    onClick={() => setOnlineStatus('active')}
                    className="flex justify-end items-center"
                >
                    {onlineStatus === 'active' && (
                        <span class="material-icons-outlined text-xs mr-2">done</span>
                    )}
                    <span>Active</span>
                </p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p
                    onClick={() => setOnlineStatus('away')}
                    className="flex justify-end items-center"
                >
                    {onlineStatus === 'away' && (
                        <span class="material-icons-outlined text-xs mr-2">done</span>
                    )}
                    <span>Away</span>
                </p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p
                    onClick={() => setOnlineStatus('do not disturb')}
                    className="flex justify-end items-center"
                >
                    {onlineStatus === 'do not disturb' && (
                        <span class="material-icons-outlined text-xs mr-2">done</span>
                    )}
                    <span>Do not disturb</span>
                </p>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="w-full lg:w-96 h-screen dark:bg-gray-900 dark:text-white border dark:border-gray-900">
            <div ref={featureHeight} className="px-3">
                {/* skype profile */}
                <div className="flex justify-between items-center py-2">
                    <div className="flex justify-start items-center">
                        <div className="border h-10 w-10 border-gray-400 dark:border-gray-800 rounded-full relative">
                            {details?.photo ? (
                                <img
                                    className="rounded-full h-10 w-10"
                                    src={details?.photo}
                                    alt="user"
                                />
                            ) : (
                                <img
                                    className="rounded-full h-10 w-10"
                                    src={`https://ui-avatars.com/api/?name=${details?.name}`}
                                    alt="user"
                                />
                            )}
                            <Dropdown
                                overlay={onlineStatusDropDown}
                                placement="bottomRight"
                                trigger={['click']}
                            >
                                <div
                                    className={`absolute bottom-0 right-0 border rounded-full h-3 w-3 cursor-pointer ${
                                        onlineStatus === 'active'
                                            ? 'bg-green-500'
                                            : onlineStatus === 'away'
                                            ? 'bg-yellow-400'
                                            : 'bg-red-600'
                                    }`}
                                ></div>
                            </Dropdown>
                        </div>
                        <div className="pl-2">
                            <p className="text-sm mb-0 truncate w-32">{details?.name}</p>
                            <Dropdown
                                overlay={statusDropDown}
                                placement="bottomRight"
                                trigger={['click']}
                            >
                                <p className="text-xs mb-0 dark:text-gray-200 text-gray-500 font-semibold pt-1 cursor-pointer">
                                    {status}
                                </p>
                            </Dropdown>
                        </div>
                    </div>
                    <DarkModeToggler />
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                        <span className="material-icons-outlined p-1 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out">
                            more_horiz
                        </span>
                    </Dropdown>
                </div>

                {/* search people area */}
                <div className="flex justify-between items-center">
                    <div className="flex mr-3 items-center w-full dark:bg-gray-800 border dark:border-gray-800 border-gray-400 rounded-lg p-2 h-10">
                        <span className="material-icons-outlined dark:text-gray-200 font-thin">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="People, groups, messages"
                            className="dark:text-white w-full text-xs pl-2 dark:bg-gray-800 focus:outline-none"
                        />
                    </div>

                    <div className="p-2 border w-8 flex cursor-pointer rounded-lg justify-center items-center h-10 border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out">
                        <span className="material-icons-outlined text-xs">dialpad</span>
                    </div>
                </div>

                {/* chat call notification navs */}
                <div className="flex justify-between items-center mt-3">
                    <div
                        className="flex-col group justify-center items-center cursor-pointer text-center"
                        onClick={() => setActiveNav('chat')}
                    >
                        <span
                            className={`border ${
                                activeNav === 'chat'
                                    ? 'bg-blue-900 border-blue-800 text-white'
                                    : 'group-hover:border-blue-800 group-hover:bg-blue-800'
                            } group-hover:text-white  rounded-full p-2  dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out`}
                        >
                            chat
                        </span>
                        <p
                            className={`text-xs ${
                                activeNav === 'chat'
                                    ? 'dark:text-blue-300 text-white'
                                    : 'group-hover:text-blue-800 dark:group-hover:text-blue-300'
                            }  dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0`}
                        >
                            Chats
                        </p>
                    </div>
                    <div
                        className="flex-col group justify-center items-center cursor-pointer text-center"
                        onClick={() => setActiveNav('call')}
                    >
                        <span
                            className={`border ${
                                activeNav === 'call'
                                    ? 'bg-blue-900 border-blue-800 text-white'
                                    : 'group-hover:border-blue-800 group-hover:bg-blue-800'
                            } group-hover:text-white  rounded-full p-2  dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out`}
                        >
                            call
                        </span>
                        <p
                            className={`text-xs ${
                                activeNav === 'call'
                                    ? 'dark:text-blue-300 text-white'
                                    : 'group-hover:text-blue-800 dark:group-hover:text-blue-300'
                            }  dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0`}
                        >
                            Calls
                        </p>
                    </div>
                    <div
                        className="flex-col group justify-center items-center cursor-pointer text-center"
                        onClick={() => setActiveNav('contacts')}
                    >
                        <span
                            className={`border ${
                                activeNav === 'contacts'
                                    ? 'bg-blue-900 border-blue-800 text-white'
                                    : 'group-hover:border-blue-800 group-hover:bg-blue-800'
                            } group-hover:text-white  rounded-full p-2  dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out`}
                        >
                            perm_contact_calendar
                        </span>
                        <p
                            className={`text-xs ${
                                activeNav === 'contacts'
                                    ? 'dark:text-blue-300 text-white'
                                    : 'group-hover:text-blue-800 dark:group-hover:text-blue-300'
                            }  dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0`}
                        >
                            Contacts
                        </p>
                    </div>
                    <div
                        className="flex-col group justify-center items-center cursor-pointer text-center"
                        onClick={() => setActiveNav('notifications')}
                    >
                        <span
                            className={`border ${
                                activeNav === 'notifications'
                                    ? 'bg-blue-900 border-blue-800 text-white'
                                    : 'group-hover:border-blue-800 group-hover:bg-blue-800'
                            } group-hover:text-white  rounded-full p-2  dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out`}
                        >
                            notifications
                        </span>
                        <p
                            className={`text-xs ${
                                activeNav === 'notifications'
                                    ? 'dark:text-blue-300 text-white'
                                    : 'group-hover:text-blue-800 dark:group-hover:text-blue-300'
                            }  dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0`}
                        >
                            Notifications
                        </p>
                    </div>
                </div>

                {/* chatting and calling options */}
                <div className="flex justify-between items-center mt-3">
                    <div className="flex justify-around mr-1.5 cursor-pointer items-center w-full dark:bg-gray-800 border dark:border-gray-800 border-gray-400 rounded-xl p-2 h-10">
                        <span className="material-icons-outlined dark:text-gray-200 font-thin text-xs">
                            videocam
                        </span>
                        <p className="dark:text-white pl-2 text-sm mb-0">Meet now</p>
                    </div>
                    <div className="flex justify-around ml-1.5 cursor-pointer items-center w-full dark:bg-gray-800 border dark:border-gray-800 border-gray-400 rounded-xl p-2 h-10">
                        <span className="material-icons-outlined dark:text-gray-200 font-thin text-xs">
                            forum
                        </span>
                        <p className="dark:text-white pl-2 text-sm mb-0">New Chat</p>
                    </div>
                </div>
            </div>

            {/* chatting list */}
            <div
                className="overflow-y-auto mt-2 px-3 chatList"
                style={{ maxHeight: featureHeight.current ? `${chatListHeight}` : 'auto' }}
            >
                {chatUsers &&
                    chatUsers.map((user) => (
                        <ChatUser
                            key={user._id}
                            image={
                                user.image
                                    ? user.image
                                    : `https://ui-avatars.com/api/?name=${user.name}`
                            }
                            chattingUser={chattingUser}
                            userDetails={user}
                            userMessage={messageList && messageList}
                            openUserChat={openUserChat}
                        />
                    ))}
            </div>
        </div>
    );
};

export default SidePanel;
