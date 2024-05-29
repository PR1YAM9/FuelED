import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function SideBarRight({ users, user, handleUserSelect, selectedUser }) {

    console.log(users);
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, right: open });
    };

    const list = () => (
        <Box 
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {users.map((user) => (
                    <ListItem
                        key={user._id}
                        disablePadding
                        className={`chatOnlineFriendCard ${selectedUser === user._id ? 'active' : ''}`}
                        onClick={() => handleUserSelect(user._id)}
                    >
                        <ListItemButton>
                            <ListItemText primary={user.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div className='chatOn'>
            <Button
             sx={{
            backgroundColor: "#C3A8E1",
            // color: "black",
            fontFamily: "Imprima",
            fontSize: { md: "25px", xs: "15x" },
            borderRadius: "30px",
            // padding: "0px 40px",
            "&:hover": {
              backgroundColor: "#C3A8E1",
            },
            // mt: "30px",
            color: "white",
            width: "100%",
          }} 
            onClick={toggleDrawer(true)}>All Chats</Button>
            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}
