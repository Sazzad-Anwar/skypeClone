import ChatArea from './ChatArea';
import ChattingHead from './ChattingHead';

const Chatting = ({ closeUserChat, isMobileWidth, toggleRightSidePanel, chattingUser, socket }) => {
    return (
        <div className="w-full h-screen dark:bg-black p-4">
            <ChattingHead
                chattingUser={chattingUser}
                closeUserChat={closeUserChat}
                isMobileWidth={isMobileWidth}
                toggleRightSidePanel={toggleRightSidePanel}
            />
            <ChatArea chattingUser={chattingUser} socket={socket} />
        </div>
    );
};

export default Chatting;
