import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Footer({ bgColor }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <Box
      sx={{
        bgcolor: bgColor,
        padding: "15px",
      }}
    >
      <Box
        sx={{
          border: "2px solid white",
          padding: "20px",
          position: "relative", // Added position relative here
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              border: "2px solid white",
              borderRadius: "50px",
              padding: "5px 7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inika",
              width: "20px",
              position: "absolute",
              top: "-40px",
              backgroundColor: bgColor,
              color: "white",
            }}
          >
            PP
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "left",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inconsolata",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              mt: "10px",
            }}
          >
            Ready to Plan a party ?
          </Typography>
          <Button
            onClick={handleClick}
            sx={{
              backgroundColor: "white",
              color: bgColor,
              fontFamily: "Imprima",
              fontSize: { md: "29px", xs: "18px" },
              borderRadius: "30px",
              padding: "0px 40px",
              "&:hover": {
                backgroundColor: bgColor,
                color: "white",
                Border: "1px solid white",
              },
              mt: "10px",
            }}
          >
            BEGIN
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: "50px",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inconsolata",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              borderRight: "2px solid white",
              pr: "10px",
            }}
          >
            About us
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inconsolata",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Key Features
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "right",
            mt: "10px",
            fontFamily: "Inconsolata",
            color: "white",
            fontSize: "15px",
          }}
        >
          © Copyright 2024 by Laiba Ahsan & Priyam Maini. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
}
