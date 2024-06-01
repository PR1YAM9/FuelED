import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../components/SideBar";
import { Typography, Box, Button, TextField } from "@mui/material";
import BudgetManagerTable from "../../components/Table/BudgetManagerTable";
import BudgetManagerModal from "../../components/BudgetManagerModal";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function BudgetManager() {
  const {user} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [eventId, setEventId] = useState(user.events[0]); // replace with actual event ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get(`https://fuel-ed-noyz.vercel.app/api/event/getBudget/${eventId}`);
        setTotalBudget(budgetResponse.data.budget.total);

        const expensesResponse = await axios.get(`https://fuel-ed-noyz.vercel.app/api/event/getexpenses/${eventId}`);
        setData(expensesResponse.data.expenses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      const total = data.reduce(
        (sum, expense) => sum + (expense && expense.amount ? parseFloat(expense.amount) : 0),
        0
      );
      
      setTotalExpenses(total);
    };

    calculateTotalExpenses();
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addExpense = (expense) => {
    setData([...data, expense]);
  };

  const handleBudgetChange = async (e) => {
    const newBudget = e.target.value;
    setTotalBudget(newBudget);
    try {
      await axios.post(`https://fuel-ed-noyz.vercel.app/api/event/addBudget/${eventId}`, { totalBudget: newBudget });
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const remainingBudget = totalBudget ? totalBudget - totalExpenses : 0;
  // console.log(data);
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
            mb: { md: "30px", xs: "15px" },
            color: "white",
          }}
        >
          Add Expense
        </Button>
        <BudgetManagerModal
          handleClose={handleClose}
          open={open}
          addExpense={addExpense}
          eventId={eventId} // pass the eventId prop
        />
        <Typography variant="h5" sx={{ mt: 3, color: "#C3A8E1" }}>
          Budget:
          <TextField
            variant="standard"
            type="number"
            value={totalBudget}
            onChange={handleBudgetChange}
            InputProps={{ disableUnderline: true }}
            sx={{ ml: 2, fontSize: "24px" }}
          />
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, color: "#C3A8E1" }}>
          Total Expenses: ${totalExpenses}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, color: "#C3A8E1" , mb: 3 }}>
          Remaining Budget: ${remainingBudget}
        </Typography>
        <BudgetManagerTable  data={data} />
      </Box>
    </div>
  );
}
