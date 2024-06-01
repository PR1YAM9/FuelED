import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const EventDetails = () => {
  const [loader, setLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoader(true);
      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/geteventdetails/${user.events[0]}`
        );
        setEventDetails(res.data.event);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
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
      {loader ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            mt: 3,
          }}
        >
          <CircularProgress
            sx={{
              color: "#E09BAC",
            }}
          />
        </Box>
      ) : user.events[0] ? (
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
            sx={{ color: "#00000087" }}
            gutterBottom
          >
            {eventDetails?.description}
          </Typography>
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
      ) : (
        <Typography
          variant="h6"
          sx={{
            mt: 5,
            color: "#E09BAC",
            display: "flex",
            justifyContent: "left",
            fontFamily: "Inconsolata",
          }}
        >
          Create an event to view details
        </Typography>
      )}
    </Box>
  );
};

export default EventDetails;
