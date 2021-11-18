const WelcomePage = ({ img, name }) => {
    return (
        <div className="w-full h-screen dark:bg-gray-700 flex justify-center items-center">
            <div className="flex justify-start items-center">
                <div className="border h-20 w-20 border-gray-400 dark:border-gray-800 rounded-full relative">
                    {img ? (
                        <img className="rounded-full h-20 w-20" src={img} alt="user" />
                    ) : (
                        <img
                            className="rounded-full h-20 w-20"
                            src={`https://ui-avatars.com/api/?name=${name}`}
                            alt="user"
                        />
                    )}

                    <div className="absolute bottom-0 right-0 border rounded-full h-5 w-5 bg-green-500"></div>
                </div>
                <div className="pl-2">
                    <p className="text-4xl mb-0 font-thin">Welcome !</p>
                    <p className="text-3xl mb-0 dark:text-gray-200 text-gray-500 font-semibold pt-1 cursor-pointer">
                        {name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
