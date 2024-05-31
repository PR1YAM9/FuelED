import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

export default function CalenderModal({
  open,
  handleClose,
  handleSubmit,
  date,
}) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);

  const onSubmit = () => {
    handleSubmit({ heading, description, time });
    setHeading("");
    setDescription("");
    setTime(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {date && dayjs(date).format("MMMM D, YYYY")}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="heading"
          label="Add Entry Heading"
          name="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
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
          id="description"
          label="Add Entry Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          sx={{ mb: 2 }}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Basic time picker"
            value={time}
            onChange={setTime}
            renderInput={(params) => (
              <TextField
                {...params}
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
            )}
          />
        </LocalizationProvider> */}

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              backgroundColor: "#C3A8E1",
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
              borderRadius: "30px",
              padding: "5px 30px",
              "&:hover": { backgroundColor: "#C3A8E1" },
              mb: { md: "30px", xs: "15px" },
              color: "white",
              mt: 3,
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "#C3A8E1",
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
              borderRadius: "30px",
              padding: "5px 30px",
              "&:hover": { backgroundColor: "#C3A8E1" },
              mb: { md: "30px", xs: "15px" },
              color: "white",
              mt: 3,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
