import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/login';
import Signup from '../components/signup';
import AddJob from "../components/addJob";
import History from "../components/history";
import Dashboard from "../components/profile"
import UserDetails from "../components/addDetails"
import MyJobs from "../components/myJobs"
import FileNotFound from "../components/404"

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
