import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams, useLocation } from "react-router-dom";

export default function SideBar() {
  const { user } = React.useContext(AuthContext);
  console.log(user);

  const [state, setState] = useState({
    left: false,
  });
  const { pathname } = useLocation();
  const params = useParams();
  const [event, setEvent] = useState("");

  const handleChange = (event) => {
    setEvent(event.target.value);
  };

  const getActiveTab = () => {
    const paths = pathname.split("/");
    const tabPath = paths[paths.length - 1];

    switch (tabPath) {
      case "dashboard":
        return "Dashboard";
      case "GuestList":
        return "Guest List";
      case "VendorsList":
        return "Vendors List";
      case "messenger":
        return "Messenger";
      case "BudgetManager":
        return "Budget Manager";
      case "SeatingPlan":
        return "Seating Place";
      case "GiftRegistary":
        return "Gift Registry";
      case "Calender":
        return "Calendar";
      case "announcements":
        return "Announcements";
      default:
        return "Dashboard";
    }
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleListItemClick = (text) => {
    setActiveTab(text);
  };

  const listItems = [
    { text: "Dashboard", link: "/dashboard", roles: ["HOST", "GUEST", "VENDOR"] },
    { text: "Guest List", link: "/dashboard/GuestList", roles: ["HOST"] },
    { text: "Vendors List", link: "/dashboard/VendorsList", roles: ["HOST"] },
    { text: "Messenger", link: "/messenger", roles: ["HOST", "VENDOR"] },
    { text: "Budget Manager", link: "/dashboard/BudgetManager", roles: ["HOST"] },
    { text: "Seating Place", link: "/dashboard/SeatingPlan", roles: ["HOST"] },
    { text: "Gift Registry", link: "/dashboard/GiftRegistary", roles: ["HOST", "GUEST"] },
    { text: "Calendar", link: "/dashboard/Calender", roles: ["HOST"] },
    { text: "Announcements", link: "/dashboard/announcements", roles: ["HOST", "GUEST"] },
  ];

  const filteredListItems = listItems.filter(item => item.roles.includes(user.role));

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
        <Button
          variant="outlined"
          sx={{
            color: "white",
            border: "1px solid white",
            fontFamily: "Inconsolata",
            fontSize: { md: "20px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#C3A8E1" },
            mb: { md: "30px", xs: "15px" },
            "&.Mui-disabled": {
              background: "#C6D3BD",
              color: "white",
            },
          }}
        >
          Create Event
        </Button>
      </Box>
      <List>
        {filteredListItems.map(({ text, link }, index) => (
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
            sx={{ color: "#E09BAC" }}
            onClick={toggleDrawer("left", true)}
            fontSize="large"
          />
          <AccountCircleIcon sx={{ color: "#E09BAC" }} fontSize="large" />
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
