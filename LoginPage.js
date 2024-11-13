import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import '../styles/App.css'; // Ensure you have your styles for the login page

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
  
    try {
      const response = await axios.get('http://localhost:3000/user', {
        params: {
          username: formData.username,
          password: formData.password
        }
      });
  
      if (response.data.length > 0) {
        console.log('Login successful:', response.data);
        const userId = response.data[0].id; // Get the user ID
        navigate(`/dashboard/${formData.username}`); // Redirect to the personalized dashboard
        localStorage.setItem('userId', userId); // Store user ID for later use if needed
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="login-input-u"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input-p"
        />
        <button type="submit" className="login-button">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
