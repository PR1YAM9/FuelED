import SideBar from "../../components/SideBar";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Table from "../../components/Table";
import AddGuestModal from "../../components/AddGuestModal";
import { useState } from "react";
import AddVendorModal from "../../components/AddVendorModal/AddVendorModal";

export default function VendorsList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    companyName: "", 
  });
  const columns = ["S.no", "Name", "Contact", "Email", "Service Type"];
  const data = [
    {
      sno: 1,
      name: "ABC Catering",
      phone: "+91 98765 43210",
      email: "abc.catering@example.com",
      serviceType: "Catering",
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
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#C3A8E1" },
            mb: { md: "30px", xs: "25px" },
            color: "white",
          }}
        >
          Onboard Vendor
        </Button>
        <Table columns={columns} data={data} />
        <AddVendorModal
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
