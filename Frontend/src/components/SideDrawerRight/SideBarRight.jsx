import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

export default function SideBarRight({
  users,
  user,
  handleUserSelect,
  selectedUser,
}) {
  console.log(users);
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, right: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250, bgcolor: "#C6D3BD", height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem
              disablePadding
              className={`chatOnlineFriendCard ${
                selectedUser === user._id ? "active" : ""
              }`}
              onClick={() => handleUserSelect(user._id)}
            >
              <ListItemButton>
                <ListItemText
                  primary={user.name}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: "Inconsolata",
                      fontSize: "18px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ bgcolor: "white", mr: 2.5 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="chatOn">
      <Box
        sx={{
          mr: "20px",
        }}
      >
        <Button
          variant="conatined"
          sx={{
            backgroundColor: "#C3A8E1",
            fontFamily: "Imprima",
            fontSize: { md: "25px", xs: "15x" },
            borderRadius: "30px",
            padding: "5px 40px",
            "&:hover": {
              backgroundColor: "#C3A8E1",
            },
            mt: 11,
            color: "white",
            width: "100%",
          }}
          onClick={toggleDrawer(true)}
        >
          All Chats
        </Button>
        <Typography
          sx={{
            color: "black",
            fontFamily: "Imprima",

            fontSize: "10px",
            mt: 0.3,
            ml: 5.5,
          }}
        >
          *Click to select a chat
        </Typography>
      </Box>

      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
