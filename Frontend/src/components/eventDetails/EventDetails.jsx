import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";

const EventDetails = () => {
  const { user } = useContext(AuthContext);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/geteventdetails/${user.events[1]}`
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
    <Box
      sx={{
        padding: "0 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
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
            mt: 2,
            color: "#E09BAC",
            display: "flex",
            justifyContent: "left",
            fontFamily: "Inconsolata",
          }}
        >
          Event Details
        </Typography>
      </Box>

      <Stack
        direction="column"
        sx={{ mt: 5, justifyContent: "center", alignItems: "center" }}
      >
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

        <Typography
          variant="caption"
          display="block"
          sx={{ color: "#00000087", mt: 3 }}
          gutterBottom
        >
          Start Date and Time
        </Typography>
        <Chip
          sx={{
            width: "200px",
            color: "black",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
          label={formattedTime}
        />

        <Typography
          variant="caption"
          display="block"
          sx={{ color: "#00000087", mt: 3 }}
          gutterBottom
        >
          Start Date and Time
        </Typography>
        <Chip
          sx={{
            width: "200px",
            color: "black",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
          label={formattedEndTime}
        />

        <Typography
          variant="caption"
          display="block"
          sx={{ color: "#00000087", mt: 3 }}
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
          sx={{ color: "#00000087", mt: 3 }}
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
    </Box>
  );
};

export default EventDetails;
