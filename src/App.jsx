import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Sidebar from "./Components/Sidebar";
import ProfilePage from "./Pages/ProfilePage";
import Devices from "./Pages/Devices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/devices" element={<Devices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;