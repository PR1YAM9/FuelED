import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";

const EventDetails = () => {
  const { user } = useContext(AuthContext);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(
          `/api/event/geteventdetails/${user.events[1]}`
        );
        setEventDetails(res.data.event);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && user.events && user.events.length > 0) {
      fetchEventDetails();
    }
  }, [user]);
  const formattedTime = new Date(eventDetails?.startDateTime).toLocaleString();
  const formattedEndTime = new Date(eventDetails?.endDateTime).toLocaleString();
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          ml: 6,
          color: "#E09BAC",
          display: "flex",
          justifyContent: "left",
          fontFamily: "Inconsolata",
        }}
      >
        Hi {user.name}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          ml: 6,
          color: "#E09BAC",
          display: "flex",
          justifyContent: "left",
          fontFamily: "Inconsolata",
        }}
      >
        Event Details
      </Typography>
      <Stack direction="column" sx={{ ml: 6, mt: 5 }}>
        <Typography
          variant="caption"
          display="block"
          sx={{ color: "#00000087" }}
          gutterBottom
        >
          Event Name
        </Typography>
        <Chip
          sx={{
            width: "200px",
            color: "black",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
          label={eventDetails?.eventName}
        />
          <Stack direction="row" sx={{ mt: 3 }}>
          <Stack direction="column" >
            <Typography
              variant="caption"
              display="block"
              sx={{ color: "#00000087" }}
              gutterBottom
            >
              Start Date and Time
            </Typography>
            <Chip
              sx={{
                width: "170px",
                color: "black",
                display: "flex",
                justifyContent: "center",
                fontFamily: "Inconsolata",
              }}
              label={formattedTime}
              
            />
            </Stack>
          <Stack direction="column" >
            <Typography
              variant="caption"
              display="block"
              sx={{ color: "#00000087", ml: 3}}
              gutterBottom
            >
              Start Date and Time
            </Typography>
            <Chip
              sx={{
                ml:2,
                width: "170px",
                color: "black",
                display: "flex",
                justifyContent: "center",
                fontFamily: "Inconsolata",
              }}
              label={formattedEndTime}  
            />
            </Stack>
          </Stack>
          <Typography
          variant="caption"
          display="block"
          sx={{ color: "#00000087",mt:3 }}
          gutterBottom
        >
          Venue
        </Typography>
        <Chip
          sx={{
            width: "200px",
            color: "black",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
          label={eventDetails?.venue.address}
        />
        <Typography
          variant="caption"
          display="block"
          sx={{ color: "#00000087",mt:3 }}
          gutterBottom
        >
          Maps Link
        </Typography>
        <Chip
          sx={{
            width: "200px",
            color: "black",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
          href={eventDetails?.venue.mapsLink}
          label="Click here"
          
        />
      </Stack>
    </>
  );
};

export default EventDetails;
