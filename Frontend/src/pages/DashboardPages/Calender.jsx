import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Typography, Box, Button } from "@mui/material";
import CalenderComponent from "../../components/CalenderComponent";
import CalenderModal from "../../components/CalenderModal";
import dayjs from "dayjs";

export default function Calender() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries, setEntries] = useState({});

  useEffect(() => {
    // Load entries from local storage
    const storedEntries =
      JSON.parse(localStorage.getItem("calenderEntries")) || {};
    setEntries(storedEntries);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (entry) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const newEntries = {
      ...entries,
      [dateKey]: [...(entries[dateKey] || []), entry],
    };
    setEntries(newEntries);
    localStorage.setItem("calenderEntries", JSON.stringify(newEntries));
    handleClose();
  };

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
          Calender
        </Typography>
        <CalenderComponent onDateClick={handleDateClick} entries={entries} />
        <Button
          variant="contained"
          onClick={handleOpen}
          disabled={!selectedDate}
          sx={{
            backgroundColor: selectedDate ? "#C3A8E1" : "#E0E0E0",
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": {
              backgroundColor: selectedDate ? "#C3A8E1" : "#E0E0E0",
            },
            mb: { md: "30px", xs: "15px" },
            color: "white",
            mt: 2,
          }}
        >
          Add to Calender
        </Button>
      </Box>
      <CalenderModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        date={selectedDate}
      />
      {selectedDate && entries[selectedDate.toISOString().split("T")[0]] && (
        <Box sx={{ mt: 2, ml: "20px" }}>
          <Typography variant="h6">
            Entries for {dayjs(selectedDate).format("MMMM D, YYYY")}:
          </Typography>
          {entries[selectedDate.toISOString().split("T")[0]].map(
            (entry, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Heading: {entry.heading}
                </Typography>
                <Typography variant="body1">
                  Description: {entry.description}
                </Typography>
                {/* <Typography variant="body1">
                  Time: {dayjs(entry.time).format("HH:mm")}
                </Typography> */}
              </Box>
            )
          )}
        </Box>
      )}
    </div>
  );
}
