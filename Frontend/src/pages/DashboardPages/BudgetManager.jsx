import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Typography, Box, Button, TextField } from "@mui/material";
import BudgetManagerTable from "../../components/Table/BudgetManagerTable";
import BudgetManagerModal from "../../components/BudgetManagerModal";

export default function BudgetManager() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expenses")) || [];
    setData(storedData);
    const storedBudget = localStorage.getItem("totalBudget") || "";
    setTotalBudget(storedBudget);
  }, []);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      const total = data.reduce(
        (sum, expense) => sum + parseFloat(expense.Amount || 0),
        0
      );
      setTotalExpenses(total);
    };

    calculateTotalExpenses();
  }, [data]);

  const handleOpen = () => {
    console.log("Opening Modal"); // Debug log
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Closing Modal"); // Debug log
    setOpen(false);
  };

  const addExpense = (expense) => {
    const updatedData = [...data, expense];
    setData(updatedData);
    localStorage.setItem("expenses", JSON.stringify(updatedData));
    handleClose();
  };

  const handleBudgetChange = (e) => {
    const newBudget = e.target.value;
    setTotalBudget(newBudget);
    localStorage.setItem("totalBudget", newBudget);
  };

  const remainingBudget = totalBudget ? totalBudget - totalExpenses : 0;

  return (
    <div>
      <SideBar />
      <Box sx={{ padding: "0 20px" }}>
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
          Budget Manager
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
            mb: 3,
            color: "white",
            mt: 2,
          }}
        >
          Add Expense
        </Button>
        {data.length > 0 ? (
          <BudgetManagerTable data={data} />
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No expense added
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Typography>Enter your total budget: </Typography>
          <TextField
            sx={{
              mb: 3,
              width: "140px",
            }}
            margin="normal"
            required
            id="totalBudget"
            label=""
            type="number"
            value={totalBudget}
            onChange={handleBudgetChange}
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
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Typography>Total expenses: </Typography>
          <TextField
            sx={{
              mb: 3,
              width: "140px",
            }}
            margin="normal"
            required
            id="totalExpenses"
            label=""
            type="number"
            value={totalExpenses}
            InputProps={{
              readOnly: true,
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography>Budget remaining: </Typography>
          <TextField
            sx={{
              mb: 3,
              width: "140px",
            }}
            margin="normal"
            required
            id="remainingBudget"
            label=""
            type="number"
            value={remainingBudget}
            InputProps={{
              readOnly: true,
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
        </Box>
      </Box>
      <BudgetManagerModal
        handleClose={handleClose}
        open={open}
        addExpense={addExpense}
      />
    </div>
  );
}
