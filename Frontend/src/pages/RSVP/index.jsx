import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import defaultPicture from "../../assets/default_RSVP_Picture.png";
import defaultPictureBg from "../../assets/default_RSVP_Picture_Bg.svg";
import RsvpForm from "../../components/RsvpForm";
import Footer from "../../components/Footer";

export default function RSVP() {
  const formRef = useRef(null); // Create a ref for the form

  const data = [
    {
      imgUrl: defaultPicture,
      Heading: "Invite to event kindly RSVP",
      SubHeading:
        "To mark special day, we are throwing a grand party and would love for you to join us in celebrating this special milestone. This event promises to be a delightful evening filled with laughter, joy, and cherished memories. We have planned an array of exciting activities, delectable food, and great music to make this night truly unforgettable. Your presence would add a touch of warmth and happiness to the celebration, making it even more special for us",
    },
  ];

  const handleScrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ backgroundColor: "#E09BAC" }}>
      <Navbar bgColor="#E09BAC" />
      <Box sx={{ padding: { md: "50px 25px", xs: "20px" } }}>
        {data.map((item, index) => (
          <Box
            key={index}
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
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Inconsolata",
                  fontSize: { md: "60px", xs: "30px" },
                  color: "white",
                }}
              >
                {item.Heading}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Imprima",
                  fontSize: { md: "22px", xs: "15px" },
                  color: "white",
                }}
              >
                {item.SubHeading}
              </Typography>
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
                src={item.imgUrl}
                alt={item.Heading}
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
        ))}
      </Box>
      <Box ref={formRef} sx={{ pt: 5, pb: 5 }}>
        <RsvpForm />
      </Box>
      <Footer bgColor="#E09BAC" />
    </Box>
  );
}
