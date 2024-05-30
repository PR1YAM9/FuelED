import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import TableRegistry from "../../components/TableRegistry/TableRegistry";
import AddGifts from "../../components/AddGifts/AddGifts";

export default function GiftRegistary() {

  const {user}=useContext(AuthContext);
  const [gifts, setGifts] = useState([]);
  
  useEffect(() => {
    const getGifts = async () => {
      try {
        const res = await axios.get(`https://fuel-ed-noyz.vercel.app/api/event/showgifts/${user.events[1]}`);
        console.log(res.data);
        setGifts(res.data.gifts);
      } catch (error) {
        console.log(error);
      }
    };
    getGifts();
  }, [user]);
  console.log(gifts);

  return (
    <div>
      <SideBar />
      <Typography
        variant="h3"
        sx={{
          ml: 6,
          color: "#E09BAC",
          display: "flex",
          justifyContent: "left",
          fontFamily: "Inconsolata",
        }}
      >
        Gift Registry
      </Typography>
      <AddGifts/>
      <TableRegistry gifts={gifts}/>
    </div>
  );
}
