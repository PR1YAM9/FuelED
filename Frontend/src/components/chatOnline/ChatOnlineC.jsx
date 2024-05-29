import { useState, useEffect, useContext } from 'react';
import './chatOnline.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import SideBarRight from '../SideDrawerRight/SideBarRight';

const ChatOnlineC = ({ setCurrentChat }) => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const eventId = user.events[0]; // Assuming user.events is an array of event IDs
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    `/api/user/participants?eventId=${eventId}&userId=${user._id}`
                );
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

    const handleUserSelect = async (userId) => {
        setSelectedUser(userId);
        try {
            const res = await axios.get(`/api/conversations/find/${user._id}/${userId}`);
            setCurrentChat(res.data);
        } catch (error) {
            console.log('Error starting conversation:', error);
        }
    };

    return (
        <div className="chatOnlinew">
            <div className="chatOnlineFriends">
                <SideBarRight  users = {users} user={user} handleUserSelect= {handleUserSelect} selectedUser={selectedUser}/>
            </div>
        </div>
    );
};

export default ChatOnlineC;
