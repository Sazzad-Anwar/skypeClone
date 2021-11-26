import ChatArea from './ChatArea';
import ChattingHead from './ChattingHead';

const Chatting = ({
    image,
    isActive,
    name,
    closeUserChat,
    isMobileWidth,
    toggleRightSidePanel,
    chattingUser,
}) => {
    return (
        <div className="w-full h-screen dark:bg-black p-4">
            <ChattingHead
                image={image}
                isActive={isActive}
                name={name}
                chattingUser={chattingUser}
                closeUserChat={closeUserChat}
                isMobileWidth={isMobileWidth}
                toggleRightSidePanel={toggleRightSidePanel}
            />
            <ChatArea image={image} isActive={isActive} name={name} />
        </div>
    );
};

export default Chatting;
