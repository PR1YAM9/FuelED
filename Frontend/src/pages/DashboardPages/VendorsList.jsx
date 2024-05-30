import React from "react";
import SideBar from "../../components/SideBar";
import { Typography, Box } from "@mui/material";

export default function VendorsList() {
  return (
    <div>
      <SideBar />
      <Box
        sx={{
          padding: "0 20px",
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
          Guest List
        </Typography>
      </Box>
    </div>
  );
}
