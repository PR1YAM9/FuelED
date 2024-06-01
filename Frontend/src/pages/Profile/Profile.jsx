import React, { useContext, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import { Box, Typography, Avatar, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`https://fuel-ed-noyz.vercel.app/api/auth/getUser/${user._id}`);
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: '#E09BAC',
            mb: 2,
          }}
        >
          {user.name[0]}
        </Avatar>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {user.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {user.role}
        </Typography>

        <FormControl sx={{ minWidth: 200, mt: 2, mb: 3 }}>
          <InputLabel id="select-event-label">Your Events</InputLabel>
          <Select
            labelId="select-event-label"
            id="select-event"
            value={selectedEvent}
            label="Select Event"
          >
            {events.map((event) => (
              <MenuItem key={event._id} value={event._id}>
                {event.eventName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Link  to={'/'}>
            <Button variant='contained' sx={{backgroundColor: '#E09BAC', color:'white'}}>
                <Typography variant="body1">↗️Home page</Typography>
            </Button>
        </Link>
      </Box>
    </>
  );
};

export default Profile;
