import { useEffect, useState } from 'react';

const ChattingHead = ({ image, isActive, name, closeUserChat }) => {
    const [isMobileWidth, setIsMobileWidth] = useState(false);

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
                    <img className="rounded-full h-11 w-11" src={image} alt="user" />
                </div>
                <div className="pl-2 w-32 lg:w-auto">
                    <div className="flex items-center">
                        <p className="mb-0 w-24 lg:w-auto truncate text-lg text-black group-hover:text-white dark:text-white">
                            {name}
                        </p>
                        <span
                            className="material-icons-outlined ml-1 cursor-pointer hover:text-gray-400 transition-colors duration-700 ease-in-out"
                            style={{ fontSize: 15 }}
                        >
                            settings
                        </span>
                    </div>
                    <div className="flex items-center">
                        <div
                            className={`border rounded-full h-2 w-2 ${
                                isActive ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                        ></div>
                        <p className="mb-0.5 ml-2 text-xs group-hover:text-white dark:text-gray-200 text-gray-500 font-semibold pt-1 w-44 cursor-pointer truncate">
                            {isActive ? 'Active now' : 'Away'}
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
                        <span className="material-icons-outlined p-1.5 mr-1 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 transition-all ease-in-out">
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
