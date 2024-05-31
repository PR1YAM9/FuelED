import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import SideBar from "../../../components/SideBar";
import { Typography, Box, CircularProgress, TextField, Button } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import Message from "../../../components/message/Message"; 
import "./annoucement.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(`https://fuel-ed-noyz.vercel.app/api/announcements/${user.events[0]}`);
        setAnnouncements(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`https://fuel-ed-noyz.vercel.app/api/announcements/${user.events[0]}`, {
        eventId: user.events[0],
        text: newAnnouncement,
        createdBy: user._id,
      });
      setAnnouncements([...announcements, res.data]);
      setNewAnnouncement("");
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <SideBar />
      <Box
        sx={{
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            mb: 2,
            color: "#E09BAC",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
        >
          Announcements
        </Typography>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {loading ? (
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
              <div className="chatBoxWrapper chatBoxann">
                <div className="chatBoxTop">
                  {announcements.map((announcement) => (
                    <div key={announcement._id} ref={scrollRef}>
                      <Message message={announcement} own={announcement.createdBy === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <TextField
                    type="text"
                    placeholder="Write an announcement"
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    value={newAnnouncement}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 , width: "278px" , fontFamily: "Imprima" ,padding: "10px", borderRadius: "20px", backgroundColor: "#f7e3e382", border: "0.5px solid white" , outline: "none"}}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      backgroundColor: "#C3A8E1",
                      fontFamily: "Imprima",
                      fontSize: { md: "20px", xs: "15px" },
                      borderRadius: "30px",
                      padding: "10px",
                      "&:hover": { backgroundColor: "#C3A8E1" },
                      color: "white",
                      width: "90px",
                    }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}
