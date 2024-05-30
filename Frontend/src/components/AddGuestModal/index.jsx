import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

export default function AddGuestModal({
  open,
  handleClose,
  formData,
  setFormData,
}) {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     contact: "",
  //     email: "",
  //     plusOne: false,
  //   });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
    handleClose();
  };

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
            Add Guest
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
            id="contact"
            label="Contact Number"
            name="contact"
            value={formData.contact}
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
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={formData.plusOne}
                onChange={handleChange}
                name="plusOne"
              />
            }
            label="+1"
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
                mb: 2,
                backgroundColor: "#C3A8E1",
                color: "black",
                fontFamily: "Imprima",
                fontSize: { md: "20px", xs: "15px" },
                borderRadius: "30px",
                padding: "5px 30px",
                "&:hover": { backgroundColor: "#C3A8E1" },
                mb: { md: "30px", xs: "15px" },
                color: "white",
              }}
            >
              Add Guest
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#C3A8E1",
                color: "black",
                fontFamily: "Imprima",
                fontSize: { md: "20px", xs: "15px" },
                borderRadius: "30px",
                padding: "5px 23px",
                "&:hover": { backgroundColor: "#C3A8E1" },
                mb: { md: "30px", xs: "15px" },
                color: "white",
              }}
            >
              Cancle
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
