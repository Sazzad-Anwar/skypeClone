import { Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatUser from './ChatUser';
import DarkModeToggler from './DarkModeToggler';

const SidePanel = ({
    dispatch,
    logOut,
    navigate,
    featureHeight,
    user,
    chatListHeight,
    openUserChat,
}) => {
    const [status, setStatus] = useState('Active');
    const [onlineStatus, setOnlineStatus] = useState('active');

    const menu = (
        <Menu className="dark:bg-gray-800">
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <Link to="/setting">Setting</Link>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
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
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Be right back')}>Be right back</p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Out of lunch')}>Out of lunch</p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('Out for lunch')}>Out for lunch</p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('In meetings')}>In meetings</p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('At school')}>At school</p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <p onClick={() => setStatus('At the movies')}>At the movies</p>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
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
                        <div className="border h-12 w-12 border-gray-400 dark:border-gray-800 rounded-full relative">
                            {user?.details?.photo ? (
                                <img
                                    className="rounded-full h-12 w-12"
                                    src={user?.details?.photo}
                                    alt="user"
                                />
                            ) : (
                                <img
                                    className="rounded-full h-12 w-12"
                                    src={`https://ui-avatars.com/api/?name=${user?.details?.name}`}
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
                            <p className="text-sm mb-0">{user?.details?.name}</p>
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
                    <div className="flex-col group justify-center items-center cursor-pointer text-center">
                        <span className="border group-hover:text-white group-hover:border-purple-800 rounded-full p-2 group-hover:bg-purple-800 dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out">
                            chat
                        </span>
                        <p className="text-xs group-hover:text-purple-800 dark:group-hover:text-purple-300 dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0">
                            Chats
                        </p>
                    </div>
                    <div className="flex-col group justify-center items-center cursor-pointer text-center">
                        <span className="border group-hover:text-white group-hover:border-purple-800 rounded-full p-2 group-hover:bg-purple-800 dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out">
                            call
                        </span>
                        <p className="text-xs group-hover:text-purple-800 dark:group-hover:text-purple-300 dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0">
                            Calls
                        </p>
                    </div>
                    <div className="flex-col group justify-center items-center cursor-pointer text-center">
                        <span className="border group-hover:text-white group-hover:border-purple-800 rounded-full p-2 group-hover:bg-purple-800 dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out">
                            perm_contact_calendar
                        </span>
                        <p className="text-xs group-hover:text-purple-800 dark:group-hover:text-purple-300 dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0">
                            Contacts
                        </p>
                    </div>
                    <div className="flex-col group justify-center items-center cursor-pointer text-center">
                        <span className="border group-hover:text-white group-hover:border-purple-800 rounded-full p-2 group-hover:bg-purple-800 dark:group-hover:text-white dark:border-gray-800 material-icons-outlined text-xs transition-all ease-in-out">
                            notifications
                        </span>
                        <p className="text-xs group-hover:text-purple-800 dark:group-hover:text-purple-300 dark:text-gray-200 text-gray-500 transition-all ease-in-out font-semibold pt-0">
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
                {[...Array(15)].map((_, index) => (
                    <ChatUser
                        key={index}
                        image={`https://ui-avatars.com/api/?name=John+${index}`}
                        name={'John ' + index}
                        isActive={true}
                        lastMsg="Call me back when you are free. Need to discuss about the project."
                        time="4.22 PM"
                        openUserChat={openUserChat}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidePanel;
