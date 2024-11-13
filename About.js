import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import '../styles/About.css'; // Import CSS for About page

const About = () => {
  return (
    <div className="about">
      <Navbar />
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
  );
};

export default About;