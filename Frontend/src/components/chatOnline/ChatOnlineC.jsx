import { useState, useEffect, useContext } from 'react';
import './chatOnline.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ChatOnlineC = ({ currentId, setCurrentChat }) => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const eventId = user.events[0]; // Assuming user.events is an array of event IDs

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/user/participants?eventId=${eventId}&userId=${user._id}`);
        // Check if the response data is an array
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (typeof res.data === 'object') {
          // Convert the object to an array
          setUsers([res.data]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [eventId, user._id]);
  

  const startConversation = async (userId) => {
    try {
      const res = await axios.get(`/api/conversations/find/${user._id}/${userId}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log('Error starting conversation:', error);
    }
  };

  return (
    <div className="chatOnline">
      <h3 className="chatOnlineHeader">{user.role === 'HOST' ? 'Online Vendors' : 'Hosts'}</h3>
      <div className="chatOnlineFriends">
        {users.map((user) => (
          <div
            key={user._id}
            className="chatOnlineFriend"
            onClick={() => startConversation(user._id)}
          >
            <div className="chatOnlineImgContainer">
              {/* You can include user's image here if available */}
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatOnlineC;
