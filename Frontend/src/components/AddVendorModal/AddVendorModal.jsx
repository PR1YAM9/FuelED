import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Checkbox } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#C3A8E1",
  "&.Mui-checked": {
    color: "#C3A8E1",
  },
}));

const AddVendorModal = ({ open, handleClose, formData, setFormData }) => {
  const { user } = React.useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vendorData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        companyName: formData.companyName,
      };

      const response = await axios.post(
        `https://fuel-ed-noyz.vercel.app/api/event/addvendors/${user.events[0]}`,
        { vendors: [vendorData] }
      );

      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  console.log(formData );
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Onboard Vendor
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="serviceType"
            label="Service Type"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C3A8E1",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#C3A8E1",
                },
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#C3A8E1",
                fontFamily: "Imprima",
                fontSize: { md: "20px", xs: "15px" },
                borderRadius: "30px",
                padding: "5px 30px",
                "&:hover": { backgroundColor: "#C3A8E1" },
                mb: { md: "30px", xs: "15px" },
                color: "white",
              }}
            >
              Add Vendor
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#C3A8E1",
                fontFamily: "Imprima",
                fontSize: { md: "20px", xs: "15px" },
                borderRadius: "30px",
                padding: "5px 23px",
                "&:hover": { backgroundColor: "#C3A8E1" },
                mb: { md: "30px", xs: "15px" },
                color: "white",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddVendorModal;
