import { useState, useEffect, useContext } from "react";
import "./chatOnline.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import SideBarRight from "../SideDrawerRight/SideBarRight";
import CircularProgress from "@mui/material/CircularProgress";

const ChatOnlineC = ({ setCurrentChat }) => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const eventId = user.events[0];
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/user/participants?eventId=${eventId}&userId=${user._id}`
        );
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (typeof res.data === "object") {
          setUsers([res.data]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [eventId, user._id]);

  const handleUserSelect = async (userId) => {
    setLoader(true);
    setSelectedUser(userId);
    try {
      const res = await axios.get(
        `https://fuel-ed-noyz.vercel.app/api/conversations/find/${user._id}/${userId}`
      );
      setCurrentChat(res.data);
      setLoader(false);
    } catch (error) {
      console.log("Error starting conversation:", error);
      setLoader(false);
    }
  };

  return (
    <div className="chatOnlinew">
      <div className="chatOnlineFriends">
        <SideBarRight
          users={users}
          user={user}
          handleUserSelect={handleUserSelect}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default ChatOnlineC;
