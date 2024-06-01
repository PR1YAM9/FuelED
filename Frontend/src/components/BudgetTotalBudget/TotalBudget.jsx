import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Typography, Box, Button, TextField, Modal } from "@mui/material";
import BudgetManagerTable from "../../components/Table/BudgetManagerTable";
import BudgetManagerModal from "../../components/BudgetManagerModal";
import axios from "axios";

const TotalBudget = ({ open, handleClose, handleSave }) => {
  const [newBudget, setNewBudget] = useState("");

  const handleChange = (e) => {
    setNewBudget(e.target.value);
  };

  const handleSaveClick = () => {
    handleSave(newBudget);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', width: '300px', top: '50%', position: 'relative', transform: 'translateY(-50%)', borderRadius: '10px' }}>
        <Typography variant="h6">Enter Total Budget</Typography>
        <TextField
          fullWidth
          margin="normal"
          id="newBudget"
          label="Total Budget"
          type="number"
          value={newBudget}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          onClick={handleSaveClick}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};