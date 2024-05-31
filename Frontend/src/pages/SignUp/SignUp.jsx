import React, { useRef } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const Register = () => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      name: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post(
        "https://fuel-ed-noyz.vercel.app/api/auth/register-host",
        user
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 5,
        pt: 9,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#E09BAC" }}>
        <LockOutlinedIcon />
      </Avatar>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Username"
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={username}
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
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={email}
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
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        autoComplete="password"
        autoFocus
        inputRef={password}
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
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#C3A8E1",
          color: "black",
          fontFamily: "Imprima",
          fontSize: { md: "20px", xs: "15px" },
          borderRadius: "30px",
          padding: "5px 30px",
          "&:hover": { backgroundColor: "#C3A8E1" },
          mb: { md: "30px", xs: "15px" },
          color: "white",
          mt: 2,
        }}
        onClick={handleClick}
      >
        Sign Up
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#C3A8E1",
          color: "black",
          fontFamily: "Imprima",
          fontSize: { md: "20px", xs: "15px" },
          borderRadius: "30px",
          padding: "5px 30px",
          "&:hover": { backgroundColor: "#C3A8E1" },
          mb: { md: "30px", xs: "15px" },
          color: "white",
          mt: 2,
        }}
      >
        Log into Account
      </Button>
    </Box>
  );
};

export default Register;
