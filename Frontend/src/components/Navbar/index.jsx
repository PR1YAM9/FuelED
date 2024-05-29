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
import { Link } from "react-router-dom"; // Import Link from React Router

export default function Navbar({ bgColor }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { user } = useContext(AuthContext);

  const menuItems = user
    ? [{ name: "Dashboard", link: "/dashboard" }, { name: "Logout", link: "/logout" }]
    : [{ name: "Login", link: "/login" }, { name: "Register", link: "/register" }];

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
            {menuItems.map((item, index) => (
              <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                <MenuItem
                  key={index}
                  onClick={handleMenuClose}
                  sx={{
                    fontFamily: "Imprima",
                  }}
                >
                 {item.name}
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
