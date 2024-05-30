import { useContext, useEffect, useRef, useState } from 'react';
import ChatOnlineC from '../../components/chatOnline/ChatOnlineC';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import './messanger.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import SideBar from '../../components/SideBar';
import Navbar from '../../components/Navbar';

const Messanger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900", { transports: ['websocket'] });
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      //
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('https://fuel-ed-noyz.vercel.app/api/conversations/' + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('https://fuel-ed-noyz.vercel.app/api/messages/' + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find((member) => member !== user._id);

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage
    });

    try {
      const res = await axios.post('https://fuel-ed-noyz.vercel.app/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
    <SideBar/>
      <div className="messenger">
        {/* <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='Search for vendors' className='chatMenuInput' />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div> */}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div key={m._id} ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <input
                      type='text'
                      placeholder='Write here'
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      className='chatMessageInput'
                    ></input>
                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                  </div>
                </> : <span className='noConversation'>Open a conversation to start a chat</span>
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnlineC currentId={user._id}
              setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
