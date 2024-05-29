import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function SideBar() {
  const { user } = React.useContext(AuthContext);
  console.log(user);

  const [state, setState] = useState({
    left: false,
  });
  const [activeTab, setActiveTab] = useState("Dashboard");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [event, setEvent] = useState("");
  const handleChange = (event) => {
    setEvent(event.target.value);
  };

  const handleListItemClick = (text) => {
    setActiveTab(text);
    localStorage.setItem("activeTab", text);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        bgcolor: "#C6D3BD",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          padding: "10px 16px",
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
            color: "white",
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
            color: "white",
          }}
        >
          PartyPals
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "15px 16px",
        }}
      >
        <Typography>Select event</Typography>
        <FormControl sx={{ m: 1, minWidth: 120, borderRadius: "40px" }}>
          <Select
            value={event}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              borderRadius: "40px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "40px",
              },
              padding: "0px 60px",
              bgcolor: "white",
              boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List>
        {[
          { text: "Dashboard", link: "/dashboard" },
          { text: "Guest List", link: "/dashboard/GuestList" },
          { text: "Vendors List", link: "/dashboard/VendorsList" },
          { text: "Messenger", link: "/messenger" },
          { text: "Budget Manager", link: "/dashboard/BudgetManager" },
          { text: "Seating Place", link: "/dashboard/SeatingPlan" },
          { text: "Gift Registry", link: "/dashboard/GiftRegistary" },
          { text: "Calendar", link: "/dashboard/Calender" },
          { text: "Announcements", link: "/dashboard/announcements" },
        ].map(({ text, link }, index) => (
          <React.Fragment key={text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeTab === text}
                component={Link}
                to={link}
                sx={{
                  borderTopLeftRadius: "35px",
                  borderBottomLeftRadius: "35px",
                  bgcolor:
                    activeTab === text ? "white !important" : "transparent",
                  "&:hover": {
                    bgcolor:
                      activeTab === text
                        ? "white !important"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => handleListItemClick(text)}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: "Inconsolata",
                      fontSize: "18px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ bgcolor: "white", ml: 2.5 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) setActiveTab(storedTab);
  }, []);

  return (
    <div>
      <React.Fragment key="left">
        <Box
          sx={{
            padding: "15px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <MenuIcon
            sx={{ color: "black" }}
            onClick={toggleDrawer("left", true)}
            fontSize="large"
          />
          <AccountCircleIcon sx={{ color: "black" }} fontSize="large" />
        </Box>

        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
