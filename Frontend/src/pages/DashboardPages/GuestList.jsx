import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Table from "../../components/Table";
import AddGuestModal from "../../components/AddGuestModal";
import axios from "axios";

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [open, setOpen] = useState(false);
  const [guestList, setGuestList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    plusOne: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const response = await axios.get("https://fuel-ed-noyz.vercel.app/api/event/guestList/66473f2db3c877acac6f5494");
        setGuests(response.data.guests);
      } catch (error) {
        console.error("Error fetching guest list:", error);
      }
    };
  
    fetchGuestList();
  }, []);// Empty dependency array to fetch data only once on component mount

    console.log(guestList);
  const columns = [ "Name", "phone", "Email", "+1"];

  return (
    <div>
      <SideBar />
      <Box
        sx={{
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            mb: 2,
            color: "#E09BAC",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
        >
          Guest List
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#C3A8E1",
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#C3A8E1" },
            mb: { md: "30px", xs: "25px" },
            color: "white",
          }}
        >
          Add Guest
        </Button>
        
<Table columns={columns} data={guests} />
        <AddGuestModal
          open={open}
          handleClose={handleClose}
          setFormData={setFormData}
          formData={formData}
        />
        <Button
          variant="contained"
          onClick={handleOpen}
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
        >
          Send Invite
        </Button>
      </Box>
    </div>
  );
}
