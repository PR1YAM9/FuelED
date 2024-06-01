import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

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

export default function BudgetManagerModal({ handleClose, open, addExpense }) {
  const [transactionTo, setTransactionTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      "Transaction To": transactionTo,
      Amount: amount,
      Status: status,
      Date: date ? date.format("DD-MM-YYYY") : null,
    };
    addExpense(expense);
    setTransactionTo("");
    setAmount("");
    setStatus("");
    setDate(null);
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
            Add Details
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="transactionTo"
            label="Transaction to"
            value={transactionTo}
            onChange={(e) => setTransactionTo(e.target.value)}
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
            id="amount"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            sx={{
              mb: 3,
            }}
            margin="normal"
            required
            fullWidth
            id="status"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  required
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
          </LocalizationProvider>
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
              Add Expense
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
