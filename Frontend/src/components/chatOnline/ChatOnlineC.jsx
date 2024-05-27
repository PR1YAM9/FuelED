import { useState, useEffect, useContext } from 'react';
import './chatOnline.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ChatOnlineC = ({ currentId, setCurrentChat }) => {
  const [user, setUser] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const eventId = currentUser.events[0]; // Assuming currentUser.events is an array of event IDs

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/user/participants?eventId=${eventId}&userId=${currentUser._id}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUsers();
  }, []);

  const startConversation = async () => {
    try {
      const res = await axios.get(`/api/conversations/find/${currentUser._id}/${user._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log('Error starting conversation:', error);
    }
  };

  return (
    <div className="chatOnline">
      <h3 className="chatOnlineHeader">{currentUser.role === 'HOST' ? 'Online Vendors' : 'Host'}</h3>
      <div className="chatOnlineFriends">
        {user && (
          <div className="chatOnlineFriend" onClick={startConversation}>
            <div className="chatOnlineImgContainer">
              {/* You can include user's image here if available */}
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatOnlineC;
