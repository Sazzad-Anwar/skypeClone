import { useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Input, Modal, Upload, message as antMessage } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
// import { messagesAction } from '../Redux/Actions/MessageActions';
// import { SocketContext } from './Socket';

const { TextArea } = Input;

const ChatArea = ({ chattingUser }) => {
    const chatAreaWidth = useRef(0);
    const textArea = useRef(0);
    const bottomAreaHeight = useRef(0);
    const dispatch = useDispatch();
    const lastMessage = useRef(null);
    const [pickFile, setPickFile] = useState(false);
    const [inputTextWidth, setInputTextWidth] = useState(0);
    const [textAreaParentHeight, setTextAreaParentHeight] = useState(0);
    const [bottomAreaFullHeight, setBottomAreaFullHeight] = useState(0);
    const [message, setMessage] = useState('');
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const { details } = useSelector((state) => state.details);
    // const socket = useContext(SocketContext);
    const socket = useSelector((state) => state.socket);
    const [chatList, setChatList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        setInputTextWidth(chatAreaWidth.current.offsetWidth);
        setTextAreaParentHeight(textArea.current.offsetHeight);
        setBottomAreaFullHeight(bottomAreaHeight.current.offsetHeight);

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

        lastMessage.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [textArea, bottomAreaHeight, textAreaParentHeight, chatAreaWidth, chatList]);

    const onEmojiClick = (event, emojiObject) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
    };

    useEffect(() => {
        socket.on('message', (message) => {
            setChatList((prevChatList) => [...prevChatList, message]);
            // dispatch(messagesAction([...chatList, message]));
        });

        return () => {
            socket.off();
        };
    }, [chatList, dispatch, socket]);

    useEffect(() => {
        socket.on('chat', (chats) => {
            setChatList(chats);
            // dispatch(messagesAction(chats));
        });

        socket.emit('get-chat', { sender: chattingUser.email, receiver: details.email });

        return () => {
            socket.off();
        };
    }, [chattingUser.email, details.email, socket]);

    //send message handler
    const messageSendHandler = () => {
        if (message.trim() !== '') {
            let messageDetails = {
                sender: details?.email,
                receiver: chattingUser.email,
                socketId: chattingUser.socketId,
                message: message,
                file: '',
                replyTo: '',
                updatedAt: new Date().toLocaleDateString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                }),
            };
            setChatList((previous) => [...previous, messageDetails]);
            // dispatch(messagesAction([...chatList, messageDetails]));
            setMessage('');
            socket.emit('message', messageDetails);
            socket.emit('to-all', messageDetails);
        }
    };

    // send message
    const sendMessage = (e) => {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            e.preventDefault();
            messageSendHandler();
        }
    };

    // dropdown menu for mobile view
    const menu = (
        <Menu className="dark:bg-gray-800">
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item className="dark:text-white dark:hover:text-black">
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );

    //copy a message
    const copyMsg = (msg) => {
        navigator.clipboard.writeText(msg);
        antMessage.success('Message copied to clipboard');
    };

    // get image in base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Select</div>
        </div>
    );

    return (
        <div
            className="container lg:container xl:container 2xl:container mx-auto h-screen relative"
            ref={chatAreaWidth}
        >
            {/* chat message area */}
            <div
                className="overflow-auto mt-5"
                style={{
                    maxHeight: `calc(100vh - ${bottomAreaFullHeight + 110}px)`,
                    height: `calc(100vh - ${bottomAreaFullHeight + 110}px)`,
                }}
            >
                {chatList.map((chat, index) => (
                    <div key={index}>
                        {chat.receiver === details?.email ? (
                            <>
                                {/* Others message */}
                                <div className="flex mb-5">
                                    <div className="h-9 w-9 lg:h-11 lg:w-11 border-gray-400 dark:border-gray-800 rounded-full">
                                        <img
                                            className="rounded-full h-9 w-9 lg:h-11 lg:w-11"
                                            src={
                                                chattingUser.image
                                                    ? chattingUser.image
                                                    : `https://ui-avatars.com/api/?name=${chattingUser.name}`
                                            }
                                            alt="user"
                                        />
                                    </div>
                                    <div>
                                        <div className="dark:text-gray-500 px-2">
                                            {new Date(chat.updatedAt).toLocaleDateString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </div>
                                        <Dropdown
                                            overlay={
                                                <Menu className="dark:bg-gray-800">
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="1"
                                                        onClick={() => copyMsg(chat.message)}
                                                    >
                                                        Copy
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="2"
                                                    >
                                                        Quote
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="3"
                                                    >
                                                        Forward
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="3"
                                                    >
                                                        Select Message
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                            trigger={['contextMenu']}
                                        >
                                            <div className="ml-2 p-3 max-w-xs lg:max-w-lg xl:max-w-xl border dark:border-gray-800 rounded-tl-none rounded-xl dark:bg-gray-800 shadow-xl">
                                                {chat.message}
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* my message */}
                                <div className="flex mb-5 justify-end">
                                    <div>
                                        <div className="dark:text-gray-500 px-3 flex justify-end">
                                            {new Date(chat.updatedAt).toLocaleDateString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </div>
                                        <Dropdown
                                            overlay={
                                                <Menu className="dark:bg-gray-800">
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="1"
                                                        onClick={() => copyMsg(chat.message)}
                                                    >
                                                        Copy
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="2"
                                                    >
                                                        Quote
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="3"
                                                    >
                                                        Forward
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        className="dark:text-white dark:hover:text-black"
                                                        key="3"
                                                    >
                                                        Select Message
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                            trigger={['contextMenu']}
                                        >
                                            <div className="mr-2 p-3 max-w-xs lg:max-w-lg xl:max-w-xl ml-auto flex border dark:border-gray-800 rounded-tr-none rounded-xl dark:bg-gray-800 shadow-xl">
                                                {chat.message}
                                            </div>
                                        </Dropdown>
                                        {index === chat.length && (
                                            <div className="h-5 w-5 mr-2 border-gray-400 ml-auto dark:border-gray-800 rounded-full">
                                                <img
                                                    className="rounded-full h-5 w-5"
                                                    src={
                                                        chattingUser.image
                                                            ? chattingUser.image
                                                            : `https://ui-avatars.com/api/?name=${chattingUser.name}`
                                                    }
                                                    alt="user"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-9 w-9 lg:h-11 lg:w-11 border-gray-400 dark:border-gray-800 rounded-full">
                                        <img
                                            className="rounded-full h-9 w-9 lg:h-11 lg:w-11"
                                            src={
                                                details?.photo ??
                                                `https://ui-avatars.com/api/?name=${details.name}`
                                            }
                                            alt="user"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <div ref={lastMessage} />
                    </div>
                ))}
            </div>

            {/* input text area */}
            <div
                className=" py-2 sticky bottom-0 left-0 right-0 dark:bg-black ml-auto"
                ref={bottomAreaHeight}
            >
                <div className="flex justify-between">
                    <div
                        className="group dark:bg-gray-800 border dark:border-gray-800 rounded-xl "
                        style={{
                            width: inputTextWidth * (3 / 4),
                        }}
                    >
                        {pickFile && (
                            <div className="flex flex-wrap items-center h-32 px-2 py-1 overflow-auto w-full">
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    multiple={true}
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img
                                        alt="example"
                                        style={{ width: '100%' }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
                        )}

                        <div className="flex overflow-x-hidden">
                            <div>
                                <span
                                    onClick={() => setShowPicker((val) => !val)}
                                    className="material-icons-outlined p-2 mr-1 cursor-pointer rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-900 transition-all ease-in-out"
                                >
                                    sentiment_satisfied
                                </span>
                                <Modal
                                    title="Select Emoji"
                                    centered
                                    visible={showPicker}
                                    onOk={() => setShowPicker(false)}
                                    onCancel={() => setShowPicker(false)}
                                >
                                    <Picker
                                        pickerStyle={{ width: '100%' }}
                                        onEmojiClick={onEmojiClick}
                                    />
                                </Modal>
                            </div>

                            <TextArea
                                ref={textArea}
                                value={message}
                                type="text"
                                placeholder="Type a message"
                                className="dark:text-white h-11 transition-all ease-in-out focus:border-none hover:border-none pt-2 text-lg border-none dark:border-gray-800 dark:bg-gray-800 focus:outline-none rounded-xl"
                                style={{
                                    width: inputTextWidth * (3 / 4) - 30,
                                }}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={sendMessage}
                                autoSize={{ maxRows: 5, minRows: 5 }}
                            />
                        </div>
                    </div>

                    <div>
                        <span
                            className="material-icons-outlined p-2 mx-2 dark:bg-gray-800 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-black transition-all ease-in-out"
                            onClick={messageSendHandler}
                        >
                            send
                        </span>
                        {!isMobileWidth ? (
                            <>
                                <span
                                    className="material-icons-outlined p-2 mx-2 dark:bg-gray-800 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-black transition-all ease-in-out"
                                    onClick={() => setPickFile(!pickFile)}
                                >
                                    {pickFile ? 'close' : 'attach_file'}
                                </span>
                                <span className="material-icons-outlined p-2 mx-2 dark:bg-gray-800 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-black transition-all ease-in-out">
                                    contact_mail
                                </span>
                            </>
                        ) : (
                            <Dropdown overlay={menu} placement="topRight" arrow>
                                <span className="material-icons-outlined p-2 mx-2 bg-gray-800 cursor-pointer border rounded-full border-gray-400 dark:border-gray-800 hover:bg-gray-400 hover:text-white dark:hover:bg-black transition-all ease-in-out">
                                    more_horiz
                                </span>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
