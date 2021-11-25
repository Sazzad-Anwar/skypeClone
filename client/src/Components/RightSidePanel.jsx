import { Image } from 'antd';

const RightSidePanel = ({ toggleRightSidePanel }) => {
    return (
        <div className="px-4 pt-10 relative">
            <span
                className="material-icons-outlined absolute top-2 left-0 p-2 mx-2 dark:bg-gray-800 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-black transition-all ease-in-out"
                onClick={toggleRightSidePanel}
            >
                close
            </span>
            <div className="h-screen overflow-y-scroll mt-4">
                {[...Array(20)].map((_, i) => {
                    if (i % 2 === 0) {
                        return (
                            <div key={i} className="my-4">
                                <p className="dark:text-gray-500 text-black mb-1">You, 4.16 PM</p>
                                <div className="w-full border dark:border-gray-800 rounded-xl flex justify-center p-2 shadow hover:shadow-lg transition-shadow ease-in-out duration-700">
                                    <Image
                                        width="100%"
                                        className="rounded-xl w-full"
                                        src="https://picsum.photos/200/300"
                                        alt="pic"
                                    />
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={i} className="my-4 ">
                            <p className="dark:text-gray-500 text-black mb-1">You, 4.16 PM</p>
                            <div className="w-full border dark:border-gray-800 rounded-xl flex justify-center p-5 shadow hover:shadow-lg transition-shadow ease-in-out duration-700 flex-col">
                                <p className="dark:text-gray-300 text-black text-lg">
                                    mediaQuery.css
                                </p>
                                <div className="flex items-center my-5">
                                    <span className="material-icons-outlined  mr-2">
                                        insert_drive_file
                                    </span>
                                    <span>File</span>
                                </div>
                                <hr className="dark:border-gray-800 border-gray-400 h-2" />

                                <a
                                    href="#top"
                                    className="dark:text-gray-300 text-black text-lg text-center dark:hover:text-gray-400 transition-all hover:text-gray-400 ease-in-out duration-700"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RightSidePanel;
