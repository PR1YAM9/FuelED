import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutCall } from "../../ApiCalls";

export default function Navbar({ bgColor }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutCall(dispatch);
    handleMenuClose();
    navigate("/");
  };

  const menuItems = user
    ? [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Login", link: "/login" },
        { name: "Sign Up", link: "/signup" },
      ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component="nav"
        sx={{
          boxShadow: "none",
          zIndex: 1100,
          backgroundColor: bgColor,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: bgColor,
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
            }}
          >
            PP
          </Typography>
          <Typography
            variant="h5"
            color="inherit"
            component="div"
            sx={{
              fontFamily: "Inconsolata",
              fontWeight: 400,
            }}
          >
            PartyPals
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                width: 150,
              },
            }}
          >
            {menuItems.map((item, index) =>
              item.link ? (
                <Link
                  key={index}
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem
                    onClick={handleMenuClose}
                    sx={{
                      fontFamily: "Imprima",
                    }}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem
                  key={index}
                  onClick={item.action}
                  sx={{
                    fontFamily: "Imprima",
                  }}
                >
                  {item.name}
                </MenuItem>
              )
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
