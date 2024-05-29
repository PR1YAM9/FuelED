import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./App.css";
import Messenger from "./pages/messanger/Messanger";
import Register from "./pages/register/Register";
import RSVP from "./pages/RSVP";
import SeatingPlan from "./pages/DashboardPages/SeatingPlan";
import CreateEvent from "./pages/createEvent/CreateEvent";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route path="/rsvp/:uniqueId" element={<RSVP />} />
        <Route path="/dashboard/seating-plan" element={<SeatingPlan />} />
        <Route path="/createevent" element={<CreateEvent/>} />
      </Routes>
    </Router>
  );
}

export default App;
