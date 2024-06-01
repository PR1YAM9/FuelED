import React, { useRef, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Register = () => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
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
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message); // Fix typo here
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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
      <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        inputRef={username}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        inputRef={email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        inputRef={password}
      />
      {errorMsg && (
        <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
          {errorMsg}
        </Alert>
      )}
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
        }}
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
        }}
        onClick={() => navigate("/login")}
      >
        Log into Account
      </Button>
    </Box>
  );
};

export default Register;
