import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Typography, Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import TableRegistry from "../../components/TableRegistry/TableRegistry";
import AddGifts from "../../components/AddGifts/AddGifts";
import CircularProgress from "@mui/material/CircularProgress";

export default function GiftRegistary() {
  const { user } = useContext(AuthContext);
  const [gifts, setGifts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getGifts = async () => {
      setLoader(true);

      try {
        const res = await axios.get(
          `https://fuel-ed-noyz.vercel.app/api/event/showgifts/${user.events[1]}`
        );
        console.log(res.data);
        setGifts(res.data.gifts);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    getGifts();
  }, [user]);
  console.log(gifts);

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
          Gift Registry
        </Typography>
        <AddGifts />
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
          <TableRegistry gifts={gifts} />
        )}
      </Box>
    </div>
  );
}
