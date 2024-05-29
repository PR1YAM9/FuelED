import React from "react";
import SideBar from "../../components/SideBar";
import EventDetails from "../../components/eventDetails/EventDetails";
export default function dashboard() {
  return (
    <div>
      <SideBar />
      <EventDetails/> 
    </div>
  );
}
