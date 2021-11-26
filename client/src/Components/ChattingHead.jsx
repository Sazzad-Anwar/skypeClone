import { useEffect, useState } from 'react';
import Modal from './Modal';

const ChattingHead = ({ closeUserChat, toggleRightSidePanel, chattingUser }) => {
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

    useEffect(() => {
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
    }, []);

    return (
        <div className="flex justify-between items-center border-b dark:border-gray-500">
            <div className="flex items-center mb-4">
                <span
                    class="visible w-auto lg:invisible lg:w-0 material-icons-outlined p-1.5 mr-3 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out"
                    onClick={closeUserChat}
                >
                    west
                </span>
                <div className="h-12 w-12 border-gray-400 dark:border-gray-800 rounded-full">
                    <img
                        className="rounded-full h-11 w-11"
                        src={
                            chattingUser.image
                                ? chattingUser.image
                                : `https://ui-avatars.com/api/?name=${chattingUser.name}`
                        }
                        alt="user"
                    />
                </div>
                <div className="pl-2 w-32 lg:w-auto">
                    <div className="flex items-center">
                        <p className="mb-0 w-24 lg:w-auto truncate text-lg text-black group-hover:text-white dark:text-white">
                            {chattingUser.name}
                        </p>
                        <span
                            className="material-icons-outlined ml-1 cursor-pointer hover:text-gray-400 transition-colors duration-700 ease-in-out"
                            style={{ fontSize: 15 }}
                            onClick={() => setShowUserDetailsModal(true)}
                        >
                            settings
                        </span>
                        <Modal showUserDetailsModal={showUserDetailsModal}>
                            <div className="relative">
                                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                                    <img
                                        className="rounded-full h-28 w-28"
                                        src={
                                            chattingUser.image
                                                ? chattingUser.image
                                                : `https://ui-avatars.com/api/?name=${chattingUser.name}`
                                        }
                                        alt="user"
                                    />
                                </div>
                                <span
                                    onClick={() => setShowUserDetailsModal(false)}
                                    className="material-icons-outlined absolute top-0 right-0 p-1 dark:bg-gray-800 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-black transition-all ease-in-out"
                                >
                                    close
                                </span>
                            </div>
                            <div className="mt-40 pb-4">
                                <h1 className="text-2xl font-bold text-center  dark:text-white">
                                    {chattingUser.name}
                                </h1>

                                <ul className="list-none mx-8 mt-10 mb-7">
                                    <li className="border-b py-3 px-3 dark:border-gray-600 flex items-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-900  hover:text-white transition-all ease-in-out">
                                        <span class="material-icons-outlined mr-2 text-xs">
                                            message
                                        </span>
                                        <span>Send Message</span>
                                    </li>
                                    <li className="border-b py-3 dark:border-gray-600 flex items-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-900  hover:text-white px-3 transition-all ease-in-out">
                                        <span class="material-icons-outlined mr-2 text-xs">
                                            call
                                        </span>
                                        <span>Make a call</span>
                                    </li>
                                    <li className="border-b py-3 dark:border-gray-600 flex items-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-900  hover:text-white px-3 transition-all ease-in-out">
                                        <span class="material-icons-outlined mr-2 text-xs">
                                            videocam
                                        </span>
                                        <span>Make a video call</span>
                                    </li>
                                    <li className="border-b py-3 dark:border-gray-600 flex items-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-900  hover:text-white px-3 transition-all ease-in-out">
                                        <span class="material-icons-outlined mr-2 text-xs text-red-700 font-bold">
                                            block
                                        </span>
                                        <span>Block this user</span>
                                    </li>
                                </ul>
                            </div>
                        </Modal>
                    </div>
                    <div className="flex items-center">
                        <div
                            className={`border rounded-full h-2 w-2 ${
                                chattingUser.isActive ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                        ></div>
                        <p className="mb-0.5 ml-2 text-xs group-hover:text-white dark:text-gray-200 text-gray-500 font-semibold pt-1 w-44 cursor-pointer truncate">
                            {chattingUser.isActive ? 'Active now' : 'Away'}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center mb-4">
                {!isMobileWidth && (
                    <>
                        <span className="material-icons-outlined p-1.5 mr-1 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out">
                            search
                        </span>
                        <span
                            onClick={toggleRightSidePanel}
                            className="material-icons-outlined p-1.5 mr-1 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out"
                        >
                            photo_library
                        </span>
                        <span className="material-icons-outlined p-1.5 mr-1 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out">
                            person_add_alt_1
                        </span>
                    </>
                )}
                <span className="material-icons-outlined p-1.5 mr-1 dark:text-white cursor-pointer border bg-blue-500 rounded-full border-gray-400 dark:border-gray-800 hover:bg-blue-800 text-white transition-all ease-in-out">
                    videocam
                </span>
                <span className="material-icons-outlined p-1.5 mr-1 dark:text-white cursor-pointer border bg-blue-500 rounded-full border-gray-400 dark:border-gray-800 hover:bg-blue-800 text-white transition-all ease-in-out">
                    call
                </span>
            </div>
        </div>
    );
};

export default ChattingHead;
