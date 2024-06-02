import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../components/SideBar";
import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import BudgetManagerTable from "../../components/Table/BudgetManagerTable";
import BudgetManagerModal from "../../components/BudgetManagerModal";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function BudgetManager() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [eventId, setEventId] = useState(user.events[0]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const budgetResponse = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/getBudget/${eventId}`
        );
        setTotalBudget(budgetResponse.data.budget.total);

        const expensesResponse = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/getexpenses/${eventId}`
        );
        setData(expensesResponse.data.expenses);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      const total = data.reduce(
        (sum, expense) =>
          sum + (expense && expense.amount ? parseFloat(expense.amount) : 0),
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
      await axios.post(
        `https://fuel-ed-noyz.vercel.app/api/event/addBudget/${eventId}`,
        { totalBudget: newBudget }
      );
    } catch (error) {
      console.error("Error updating budget:", error);
    }
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

        <BudgetManagerModal
          handleClose={handleClose}
          open={open}
          addExpense={addExpense}
          eventId={eventId}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-between",
            mb: 2,
            mt: 4,
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>Budget:</Typography>
          {loader ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "top",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#E09BAC",
                }}
              />
            </Box>
          ) : (
            <TextField
              variant="standard"
              type="number"
              value={totalBudget}
              onChange={handleBudgetChange}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "18px",
                  paddingTop: "8px",
                },
                border: "1px solid #C3A8E1",
                padding: "5px 10px",
                width: "100px",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: "18px", mb: 1 }}>
            Total Expenses:
          </Typography>
          {loader ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "top",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#E09BAC",
                }}
              />
            </Box>
          ) : (
            <TextField
              variant="standard"
              type="number"
              value={totalExpenses}
              InputProps={{
                disableUnderline: true,
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "18px",
                  paddingTop: "8px",
                },
                border: "1px solid #C3A8E1",
                padding: "5px 10px",
                width: "100px",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Typography sx={{ fontSize: "18px", mb: 2 }}>
            Remaining Budget:
          </Typography>
          {loader ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "top",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#E09BAC",
                }}
              />
            </Box>
          ) : (
            <TextField
              variant="standard"
              type="number"
              value={remainingBudget}
              InputProps={{
                disableUnderline: true,
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "18px",
                  paddingTop: "8px",
                },
                border: "1px solid #C3A8E1",
                padding: "5px 10px ",
                width: "100px",
              }}
            />
          )}
        </Box>
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
          <BudgetManagerTable data={data} />
        )}
      </Box>
    </div>
  );
}
