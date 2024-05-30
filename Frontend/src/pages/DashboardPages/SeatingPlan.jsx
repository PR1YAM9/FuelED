import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import SeatingPlanTable from "../../components/Table/SeatingPlanTable";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SeatingPlanPreview from "../../components/SeatingPlanPreview";

export default function SeatingPlan() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dropdownOptions = [
    "Oliver",
    "Emma",
    "Liam",
    "Sophia",
    "Noah",
    "Isabella",
    "Mason",
    "Mia",
    "James",
    "Ava",
    "Ethan",
    "Amelia",
    "Alexander",
    "Harper",
    "Benjamin",
    "Evelyn",
    "Lucas",
    "Aria",
    "Henry",
    "Ella",
  ];

  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const [numberOfRows, setNumberOfRows] = useState(0);
  const [tableData, setTableData] = useState([]);

  const handleTableChange = (updatedValues) => {
    setTableData(updatedValues);
  };

  const handleSubmit = () => {
    const jsonData = tableData.map((row) => ({
      guests: row.filter((guest) => guest !== "").join(", "),
    }));
    localStorage.setItem("seatingPlan", JSON.stringify(jsonData));
  };

  const handleCreateTable = () => {
    setTableData(
      Array.from({ length: numberOfRows }, () =>
        Array(numberOfColumns).fill("")
      )
    );
  };

  return (
    <div>
      <SideBar />
      <Box
        sx={{
          padding: "0px 20px",
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
          Seating Pan
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
            }}
          >
            Enter Total Number of Tables:
          </Typography>
          <TextField
            id="total-tables"
            variant="outlined"
            sx={{
              width: "20%",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  padding: "10px 14px",
                },
              },
            }}
            value={numberOfRows}
            onChange={(e) => setNumberOfRows(Number(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
            }}
          >
            Enter Number of Guests per Table:
          </Typography>
          <TextField
            id="guests-per-table"
            variant="outlined"
            sx={{
              width: "20%",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  padding: "10px 14px",
                },
              },
            }}
            value={numberOfColumns}
            onChange={(e) => setNumberOfColumns(Number(e.target.value))}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleCreateTable}
          sx={{
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
          Create Table
        </Button>
      </Box>

      {tableData.length > 0 && (
        <SeatingPlanTable
          numberOfColumns={numberOfColumns}
          numberOfRows={numberOfRows}
          dropdownOptions={dropdownOptions}
          onTableChange={handleTableChange}
        />
      )}

      <Box
        sx={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#C3A8E1",
            color: "black",
            fontFamily: "Imprima",
            fontSize: { md: "29px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#C3A8E1" },
            mt: { md: "30px", xs: "15px" },
            color: "white",
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#C3A8E1",
            color: "black",
            fontFamily: "Imprima",
            fontSize: { md: "29px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#C3A8E1" },
            mt: { md: "30px", xs: "15px" },
            color: "white",
          }}
        >
          See Preview
        </Button>
      </Box>
      <SeatingPlanPreview
        handleClose={handleClose}
        open={open}
        numberOfRows={numberOfRows}
      />
    </div>
  );
}
