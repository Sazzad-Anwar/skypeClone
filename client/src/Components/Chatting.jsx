import ChatArea from './ChatArea';
import ChattingHead from './ChattingHead';

const Chatting = ({ image, isActive, name, closeUserChat, isMobileWidth }) => {
    return (
        <div className="w-full h-screen dark:bg-black p-4">
            <ChattingHead
                image={image}
                isActive={isActive}
                name={name}
                closeUserChat={closeUserChat}
                isMobileWidth={isMobileWidth}
            />
            <ChatArea image={image} isActive={isActive} name={name} />
        </div>
    );
};

export default Chatting;
