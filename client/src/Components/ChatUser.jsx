import { useState } from 'react';

const ChatUser = ({ userDetails, openUserChat, chattingUser, userMessage }) => {
    const [activeChat, setActiveChat] = useState(false);
    const [showMessageCount, setShowMessageCount] = useState(true);

    return (
        <div
            className={`flex group justify-between mt-2 p-2 rounded-xl border dark:border-gray-800 hover:bg-gray-800 dark:hover:bg-gray-800 ${
                activeChat ? 'bg-gray-800' : ''
            } cursor-pointer transition-colors duration-100 ease-in-out hover:shadow-lg`}
            onClick={() => {
                openUserChat();
                setActiveChat(!activeChat);
                chattingUser(userDetails);
                setShowMessageCount(false);
            }}
        >
            <div className="flex justify-start items-center">
                <div className="border h-12 w-12 border-gray-400 dark:border-gray-800 rounded-full relative">
                    <img
                        className="rounded-full"
                        src={
                            userDetails.image
                                ? userDetails.image
                                : `https://ui-avatars.com/api/?name=${userDetails.name}`
                        }
                        alt="user"
                    />
                    <div
                        className={`absolute bottom-0 right-0 border rounded-full h-3 w-3 ${
                            userDetails.isActive ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                    ></div>
                </div>
                <div className="pl-2">
                    <p
                        className={`mb-0 text-sm text-black group-hover:text-white ${
                            activeChat ? 'text-white' : ''
                        } dark:text-white truncate w-36`}
                    >
                        {userDetails.name}
                    </p>
                    {userMessage.length !== 0 && (
                        <p
                            className={`mb-0 text-xs group-hover:text-white dark:text-gray-200 ${
                                activeChat ? 'text-white' : ''
                            } text-gray-500 font-semibold pt-1 w-44 cursor-pointer truncate`}
                        >
                            {userMessage[userMessage.length - 1]?.message}
                        </p>
                    )}
                </div>
            </div>
            {userMessage.length !== 0 && (
                <div>
                    <div
                        className={`text-xs group-hover:text-white text-black ${
                            activeChat ? 'text-white' : ''
                        } dark:text-white w-14`}
                    >
                        {new Date(
                            userMessage[userMessage.length - 1]?.updatedAt,
                        ).toLocaleTimeString('en-Us', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                    {showMessageCount && (
                        <div
                            className={`bg-blue-700 text-white h-5 w-5 rounded-full mx-auto text-center mt-2`}
                        >
                            {userMessage?.length}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatUser;
