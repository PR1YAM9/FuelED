import React, { useContext, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AddGifts = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #E09BAC',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const {user} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [giftName, setGiftName] = useState('');
  const [giftLink, setGiftLink] = useState('');
  const eventId = user.events[1]; // Hardcoded event ID for now

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const giftData = {
      name: giftName,
      link: giftLink,
    };

    try {
      const response = await axios.post(`https://fuel-ed-noyz.vercel.app/api/event/giftregister/${eventId}`, giftData);
      console.log('Gift registered successfully:', response.data);
      // Reset the form fields after successful submission
      setGiftName('');
      setGiftLink('');
      handleClose();
    } catch (error) {
      console.error('Error registering gift:', error);
    }
  };

  return (
    <>
      <Button sx={{
        ml: 6,
        mt: 2,
        color: "white",
        display: "flex",
        justifyContent: "left",
        fontFamily: "Inconsolata",
        backgroundColor: "#E09BAC",
        borderRadius: "10px",
        
      }} onClick={handleOpen}>Add Gifts</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-gifts-modal-title"
        aria-describedby="add-gifts-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" id="add-gifts-modal-title">
            Add a New Gift
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Gift Name"
              value={giftName}
              onChange={(e) => setGiftName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Gift Link"
              value={giftLink}
              onChange={(e) => setGiftLink(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={handleClose} variant="outlined" sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddGifts;
