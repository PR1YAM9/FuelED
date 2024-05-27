import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messanger from "./pages/messanger/Messanger";
import RSVP from "./pages/RSVP";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rsvp" element={<RSVP />} />
      </Routes>
      {/* <Messanger /> */}
    </BrowserRouter>
  );
};

export default App;
