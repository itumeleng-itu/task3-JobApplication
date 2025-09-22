import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Signup from '../pages/signup';
import AddJob from "../pages/addJob";
import History from "../pages/history";
import Dashboard from "../pages/profile"
import UserDetails from "../pages/addDetails"
import MyJobs from "../pages/myJobs"
import FileNotFound from "../pages/404"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<AddJob />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/history" element={<History />} />
        <Route path="/addDetails" element={<UserDetails />} />
        <Route path="/myJobs" element={<MyJobs />} />
        <Route path="/404" element={<FileNotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
