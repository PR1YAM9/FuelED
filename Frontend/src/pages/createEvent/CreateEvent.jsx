import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SideBar from "../../components/SideBar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [venueAddress, setVenueAddress] = useState("");
  const [venueMapLink, setVenueMapLink] = useState("");
  const [description, setDescription] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        eventName,
        startDateTime,
        endDateTime,
        venue: {
          address: venueAddress,
          mapLink: venueMapLink,
        },
        description,
        host: user._id,
      };
      const response = await axios.post(
        `https://fuel-ed-noyz.vercel.app/api/event/create`,
        formData
      );

      if (response.status === 200) {
        console.log("Event created successfully");
        // Update user in local storage
        const updatedUser = { ...user, events: [...user.events, response.data.event._id] };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // Update user in context
        navigate("/dashboard");
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      <SideBar />
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: "#E09BAC",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
            mt: 3,
          }}
        >
          Create Event
        </Typography>
        <Box
          sx={{
            border: "2px solid #E09BAC",
            padding: "20px",
            fontFamily: "Imprima",
            margin: { md: "20px 30%", xs: "20px 5%" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
            }}
          >
            Please enter the event details:
          </Typography>
          <TextField
            id="eventName"
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  //   padding: "10px 14px",
                },
              },
            }}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <TextField
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  //   padding: "10px 14px",
                },
              },
            }}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Date and Time"
              value={startDateTime}
              onChange={(newValue) => setStartDateTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={{ marginBottom: "20px" }}
            />

            <DateTimePicker
              label="End Date and Time"
              value={endDateTime}
              onChange={(newValue) => setEndDateTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={{ marginBottom: "20px" }}
            />
          </LocalizationProvider>

          <TextField
            id="venueAddress"
            label="Venue Address"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  //   padding: "10px 14px",
                },
              },
            }}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />

          <TextField
            id="venueMapLink"
            label="Venue Map Link"
            value={venueMapLink}
            onChange={(e) => setVenueMapLink(e.target.value)}
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  //   padding: "10px 14px",
                },
              },
            }}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#C3A8E1",
              fontFamily: "Imprima",
              fontSize: { md: "25px", xs: "20px" },
              borderRadius: "30px",
              padding: "0px 40px",
              "&:hover": {
                backgroundColor:"#C3A8E1",
              },
              mt: "30px",
              color: "white",
              width: "100%",
            }}
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateEvent;

