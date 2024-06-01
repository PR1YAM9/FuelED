import { useContext, useEffect, useRef, useState } from "react";
import ChatOnlineC from "../../components/chatOnline/ChatOnlineC";
import Message from "../../components/message/Message";
import "./messanger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import SideBar from "../../components/SideBar";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Messanger = () => {
  const [loader, setLoader] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900", { transports: ["websocket"] });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // Implement your logic here
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      setLoader(true);
      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "https://fuel-ed-noyz.vercel.app/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <SideBar />
      <Typography
        variant="h3"
        sx={{
          color: "#E09BAC",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Inconsolata",
        }}
      >
        Messenger
      </Typography>
      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {loader ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "top",
                  mt: 13,
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#E09BAC",
                  }}
                />
              </Box>
            ) : (
              <div className="chatBoxWrapper">
                {currentChat ? (
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
                        type="text"
                        placeholder="Write here"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        className="chatMessageInput"
                      />
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                    Open a conversation to start a chat.
                  </Typography>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnlineC currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
