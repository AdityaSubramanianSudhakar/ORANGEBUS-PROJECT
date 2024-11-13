import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage'; // Import the SignUpPage
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Profile from './components/profile';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><Navbar /><LandingPage /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> {/* Add SignUp route */}
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;