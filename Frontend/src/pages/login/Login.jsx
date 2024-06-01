import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../ApiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
      if (response && !response.error) {
        navigate("/dashboard");
      } else {
        setErrorMsg(response.error.response.data.error || "Failed to log in. Please try again.");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#E09BAC" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
          {errorMsg && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#C3A8E1",
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
              borderRadius: "30px",
              padding: "5px 30px",
              "&:hover": { backgroundColor: "#C3A8E1" },
              mb: { md: "30px", xs: "15px" },
              color: "white",
              mt: 2,
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                to="/signup"
                variant="body2"
                sx={{
                  color: "black !important",
                  textDecoration: "none !important",
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
