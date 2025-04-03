import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import {
  Box,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutCall } from "../../ApiCalls";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutCall(dispatch);
    navigate("/login");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/auth/getUser/${user._id}`
        );
        setEvents(res.data.user.events);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user._id]);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  return (
    <>
      <SideBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: "#E09BAC",
            mb: 2,
            textTransform: "uppercase",
          }}
        >
          {user.name[0]}
        </Avatar>
        <Typography variant="h4" sx={{ mb: 2, textTransform: "capitalize" }}>
          {user.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {user.role}
        </Typography>

        <FormControl sx={{ minWidth: 200, mt: 2, mb: 3 }}>
          <InputLabel
            id="select-event-label"
            sx={{
              "&.Mui-focused": {
                color: "#C3A8E1",
              },
            }}
          >
            Your Events
          </InputLabel>
          <Select
            labelId="select-event-label"
            id="select-event"
            value={selectedEvent}
            onChange={handleEventChange}
            label="Your Events"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#C3A8E1",
                },
            }}
          >
            {events.map((event) => (
              <MenuItem key={event._id} value={event._id}>
                {event.eventName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          endIcon={<ExitToAppIcon />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#E09BAC",
            color: "white",
            borderRadius: "21px",
            padding: "7px 30px",
          }}
        >
          Home page
        </Button>
        <Button
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            backgroundColor: "#E09BAC",
            color: "white",
            borderRadius: "21px",
            padding: "7px 30px",
            mt: 3,
          }}
        >
          LogOut
        </Button>
      </Box>
    </>
  );
};

export default Profile;
