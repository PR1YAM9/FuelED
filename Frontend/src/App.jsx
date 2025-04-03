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
import SignUp from "./pages/SignUp/SignUp";
import RSVP from "./pages/RSVP";
import SeatingPlan from "./pages/DashboardPages/SeatingPlan";
import CreateEvent from "./pages/createEvent/CreateEvent";
import Announcements from "./pages/DashboardPages/annoucement/Announcements";
import BudgetManager from "./pages/DashboardPages/BudgetManager";
import Calender from "./pages/DashboardPages/Calender";
import GiftRegistary from "./pages/DashboardPages/GiftRegistary";
import GuestList from "./pages/DashboardPages/GuestList";
import VendorsList from "./pages/DashboardPages/VendorsList";
import Dashboard from "./pages/DashboardPages/dashboard";
import Profile from "./pages/Profile/Profile";
import AiManipulation from "./pages/AiManipulation";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/SeatingPlan"
          element={user ? <SeatingPlan /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/announcements"
          element={user ? <Announcements /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/BudgetManager"
          element={user ? <BudgetManager /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/Calender"
          element={user ? <Calender /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/GiftRegistary"
          element={user ? <GiftRegistary /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/GuestList"
          element={user ? <GuestList /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/VendorsList"
          element={user ? <VendorsList /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/createevent"
          element={user ? <CreateEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/rsvp/:uniqueId" element={<RSVP />} />
        <Route
          path="/dashboard/image-manipulation"
          element={<AiManipulation />}
        />
      </Routes>
    </Router>
  );
}

export default App;
