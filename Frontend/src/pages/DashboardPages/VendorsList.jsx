import SideBar from "../../components/SideBar";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Table from "../../components/Table";
import AddGuestModal from "../../components/AddGuestModal";
import { useContext, useEffect, useState } from "react";
import AddVendorModal from "../../components/AddVendorModal/AddVendorModal";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function VendorsList() {
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vendorList, setVendorList] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    companyName: "",
  });
  const columns = ["Name", "phone", "Email", "Service type", "Company Name"];

  useEffect(() => {
    const fetchVendorList = async () => {
      setLoader(true);

      try {
        const response = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/vendors/${user.events[0]}`
        );
        setVendors(response.data.vendors);
        // console.log(response.data.vendors);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching guest list:", error);
        setLoader(false);
      }
    };

    fetchVendorList();
  }, []);

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
          Vendor List
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
        {loader ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "top",
              mt: 3,
            }}
          >
            <CircularProgress
              sx={{
                color: "#E09BAC",
              }}
            />
          </Box>
        ) : (
          <Table columns={columns} data={vendors} />
        )}

        <AddVendorModal
          open={open}
          handleClose={handleClose}
          setFormData={setFormData}
          formData={formData}
        />
      </Box>
    </div>
  );
}
