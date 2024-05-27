import { useContext, useEffect, useState } from 'react';
import './conversation.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Conversation = ({ conversation, currentUser }) => {
  const [userChat, setUserChat] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const vendorId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        if (user && user.events && user.events.length > 0) {
          const eventId = user.events[0];
          const res = await axios.get(`/api/user/participants?eventId=${eventId}&userId=${user._id}`);
          
          if (user.role === 'HOST') {
            const vendorId = conversation.members.find((m) => m !== currentUser._id);
            const vendor = res.data.find(v => v._id === vendorId);
            setUserChat(vendor);
          } else if (user.role === 'VENDOR') {
            setUserChat(res.data); // Assuming res.data contains the host object
          }
        }
      }  catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation, user]);

  return (
    <div className='conversation'>
      <span className="conversationName">
        {userChat ? userChat.name : "Loading..."}
      </span>
    </div>
  );
};

export default Conversation;
