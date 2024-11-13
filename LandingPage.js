import React, { useState } from 'react';
import '../styles/App.css'; // Ensure you have your styles for the landing page
import Navbar from './Navbar'; // Import the Navbar component

const LandingPage = () => {
  // State to manage form submission
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setSubmitted(true); // Set submitted state to true
    event.target.reset(); // Reset the form fields
  };

  return (
    <div>
      <Navbar />
      <div className="landing">
        <h1>Welcome to OrangeBus</h1>
        <p>Your reliable partner for bus travel.</p>
        <a href="/login" className="btn">Explore</a>
      </div>
      {/* About Section */}
      <div id="about" className="about">
        <div className="about-content">
          <h2>About OrangeBus</h2>
          <p>
            Welcome to OrangeBus, your reliable partner for bus travel. We aim to make your journey as smooth and enjoyable as possible.
          </p>
          <p>
            At OrangeBus, we believe in providing our customers with the best travel experience. Our platform offers easy booking, real-time bus tracking, and exceptional customer service.
          </p>
          <p>
            Whether you're commuting to work, traveling for leisure, or visiting family, OrangeBus is here to help you reach your destination safely and comfortably.
          </p>
          <h3>Our Mission</h3>
          <p>
            Our mission is to revolutionize the bus travel experience by leveraging technology to simplify the booking process and enhance customer satisfaction.
          </p>
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Wide range of routes and schedules</li>
            <li>User-friendly booking system</li>
            <li>Real-time tracking of buses</li>
            <li>Dedicated customer support</li>
          </ul>
        </div>
      </div>
      {/* Contact Section */}
      <div id="contact" className="contact">
        <div className="contact-content">
          <h2 style={{ textAlign: 'center', color: 'orange' }}>Contact Us</h2>
          <p>If you have any questions or need assistance, feel free to reach out to us!</p>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>

          {/* Alert Message */}
          {submitted && (
            <div className="alert">
              <p>Thank you for contacting us! We will get back to you shortly.</p>
            </div>
          )}
        </div>
      </div>
      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} OrangeBus. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;