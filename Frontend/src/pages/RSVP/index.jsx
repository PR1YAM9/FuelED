import React, { useContext, useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import defaultPicture from "../../assets/default_RSVP_Picture.png";
import defaultPictureBg from "../../assets/default_RSVP_Picture_Bg.svg";
import RsvpForm from "../../components/RsvpForm";
import Footer from "../../components/Footer";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function RSVP() {
  const formRef = useRef(null); // Create a ref for the form
  const { user } = useContext(AuthContext);
  const eventId = user.events[0]; // Hardcoded event ID for now
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/geteventdetails/${eventId}`
        );
        setEventData(response.data.event);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, []);

  const handleScrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ backgroundColor: "#E09BAC" }}>
      <Navbar bgColor="#E09BAC" />
      <Box sx={{ padding: { md: "50px 25px", xs: "20px" } }}>
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: { md: "row", xs: "column-reverse" },
            justifyContent: "space-between",
            position: "relative",
            padding: { md: "80px 60px", xs: "20px 0" },
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: { md: "800px", xs: "auto" },
              alignItems: "flex-start",
            }}
          >
            {/* Conditional rendering for event name */}
            {eventData.name && (
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Inconsolata",
                  fontSize: { md: "60px", xs: "30px" },
                  color: "white",
                }}
              >
                {eventData.name}
              </Typography>
            )}
            {/* Conditional rendering for event description */}
            {eventData.description && (
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Imprima",
                  fontSize: { md: "22px", xs: "15px" },
                  color: "white",
                }}
              >
                {eventData.description}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleScrollToForm}
              sx={{
                backgroundColor: "#C3A8E1",
                fontFamily: "Imprima",
                fontSize: { md: "29px", xs: "20px" },
                borderRadius: "30px",
                padding: "0px 40px",
                "&:hover": {
                  backgroundColor: "#C3A8E1",
                },
                mt: { md: "30px", xs: "15px" },
                color: "white",
              }}
            >
              RSVP
            </Button>
          </Box>
          <div style={{ position: "relative", margin: "0 auto" }}>
            <Box
              component="img"
              src={defaultPictureBg}
              alt="Background"
              sx={{
                width: { md: "384px", xs: "250px" },
                height: { md: "432px", xs: "281px" },
                objectFit: "cover",
                position: "relative",
                zIndex: 1,
                mt: { md: "0", xs: "40px" },
              }}
            />
            <Box
              component="img"
              src={defaultPicture}
              alt={eventData.name}
              sx={{
                width: { md: "300px", xs: "200px" },
                height: { md: "300px", xs: "200px" },
                objectFit: "contain",
                position: "absolute",
                top: { md: "30px", xs: "15px" },
                left: { md: "10px", xs: "5px" },
                zIndex: 2,
                padding: { md: "30px", xs: "15px" },
                mt: { md: "0", xs: "40px" },
              }}
            />
          </div>
        </Box>
      </Box>
      <Box ref={formRef} sx={{ pt: 5, pb: 5 }}>
        <RsvpForm />
      </Box>
      <Footer bgColor="#E09BAC" />
    </Box>
  );
}
