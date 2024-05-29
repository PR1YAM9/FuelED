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
import Announcements from "./pages/DashboardPages/Announcements";
import BudgetManager from "./pages/DashboardPages/BudgetManager";
import Calender from "./pages/DashboardPages/Calender";
import GiftRegistary from "./pages/DashboardPages/GiftRegistary";
import GuestList from "./pages/DashboardPages/GuestList";
import VendorsList from "./pages/DashboardPages/VendorsList";
import Dashboard from "./pages/DashboardPages/dashboard";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route path="/rsvp/:uniqueId" element={<RSVP />} />
        <Route path="/dashboard/SeatingPlan" element={<SeatingPlan />} />

        <Route path="/dashboard/announcements" element={<Announcements />} />
        <Route path="/dashboard/BudgetManager" element={<BudgetManager />} />
        <Route path="/dashboard/Calender" element={<Calender />} />
        <Route path="/dashboard/GiftRegistary" element={<GiftRegistary />} />
        <Route path="/dashboard/GuestList" element={<GuestList />} />
        <Route path="/dashboard/VendorsList" element={<VendorsList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createevent" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
