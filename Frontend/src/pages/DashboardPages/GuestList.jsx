import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Table from "../../components/Table";
import AddGuestModal from "../../components/AddGuestModal";

export default function GuestList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    plusOne: false,
  });
  const columns = ["S.no", "Name", "Contact", "Email", "+1"];
  const data = [
    {
      sno: 1,
      name: "John Doe",
      contact: "+91 12345 54321",
      email: "john.doe@example.com",
      "+1": "Yes",
    },
  ];

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
            color: "black",
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
        <Table columns={columns} data={data} />
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
            color: "black",
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
