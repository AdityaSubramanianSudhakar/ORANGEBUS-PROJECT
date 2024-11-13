import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios'; // Import axios
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
        tickets: 1,
    });

    const [buses, setBuses] = useState([]); // State to hold the filtered bus options
    const [selectedBus, setSelectedBus] = useState(null); // State to hold the selected bus
    const [paymentSuccess, setPaymentSuccess] = useState(false); // State for payment success alert
    const [noBusesAvailable, setNoBusesAvailable] = useState(false); // State for no buses message
    const [profile, setProfile] = useState(null); // State to hold user profile data
    const navigate = useNavigate(); // For redirection
    const { username } = useParams(); 

  const [userData, setUserData] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    // Fetch user data based on username
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user`, {
          params: { username }
        });

        if (response.data.length > 0) {
          const user = response.data[0]; // Assuming the first user is the one we're interested in
          setUserData(user); // Store user data in state
          console.log("User ID:", response.data[0].id);
          setBookingHistory(user.booking_history); // Store booking history in state directly from user data
        } else {
          alert('User not found');
          navigate('/'); // Redirect to login if user not found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username, navigate]);
    // Hardcoded bus dataset
    const busesData = [
        { id: "1", name: "Bus A", from: "Chennai", to: "Coimbatore", time: "10:00 AM", price: 20 },
        { id: "2", name: "Bus B", from: "Chennai", to: "Madurai", time: "12:00 PM", price: 25 },
        { id: "3", name: "Bus C", from: "Madurai", to: "Trichy", time: "02:00 PM", price: 30 },
        { id: "4", name: "Bus D", from: "Coimbatore", to: "Erode", time: "03:00 PM", price: 15 },
        { id: "5", name: "Bus E", from: "Tiruchirappalli", to: "Kanyakumari", time: "08:00 AM", price: 40 },
        { id: "6", name: "Bus F", from: "Chennai", to: "Salem", time: "09:30 AM", price: 35 },
        { id: "7", name: "Bus G", from: "Madurai", to: "Kodaikanal", time: "11:00 AM", price: 50 },
        // Add more bus entries as needed...
    ];

    // Districts array
    const districts = [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kancheepuram",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Kanyakumari",
        "Namakkal",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivagangai",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thiruvallur",
        "Thiruvarur",
        "Thoothukudi (Tuticorin)",
        "Tiruchirappalli (Trichy)",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur (Tirupur)",
        "Tiruvannamalai",
        "The Nilgiris (Ooty)",
        "Vellore",
        "Viluppuram (Villupuram)",
        "Virudhunagar"
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            noBusesAvailable: false // Reset noBusesAvailable state on input change
        });
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       console.log('Searching for buses with:', formData);

       // Filter buses based on user input
       const filteredBuses = busesData.filter(bus => 
           bus.from === formData.from && 
           bus.to === formData.to
       );

       setBuses(filteredBuses); // Set the filtered bus data as search results

       if (filteredBuses.length === 0) {
           setNoBusesAvailable(true); // Set state for no buses available
       } else {
           setNoBusesAvailable(false); // Reset state if buses are found
       }
   };

   const handleBusSelect = (bus) => {
       setSelectedBus(bus);
   };

   const handlePayment = async (userId) => { // Accept userId as a parameter
    console.log("User ID in handlePayment:", userId);
    const newBooking = {
        booking_id: Math.floor(Math.random() * 1000), // Unique ID for new booking
        date: formData.date,
        details: `Bus Booking from ${selectedBus.from} to ${selectedBus.to}`
    };

    try {
        // Fetch the user profile data first
        console.log('Fetching user profile with ID:', userId);
        const response = await axios.get(`http://localhost:3000/user/${userId}`); // Use the correct ID here
        console.log('Fetched user profile:', response.data);
        const userProfile = response.data;

        if (!userProfile) {
            throw new Error('User not found'); // Handle the case where user is not found
        }

        // Update booking history
        const updatedProfile = {
            ...userProfile,
            booking_history: [...userProfile.booking_history, newBooking]
        };

        // Send updated profile to json-server
        await axios.put(`http://localhost:3000/user/${userId}`, updatedProfile); // Ensure correct ID

        console.log('For Payment successful and booking history updated:', newBooking);
        console.log(userId);
        setPaymentSuccess(true); // Simulate successful payment
    } catch (error) {
        console.error('Error updating booking history:', error.response?.data || error.message);
    }
};


   // Automatically redirect to profile after payment success
useEffect(() => {
  if (paymentSuccess && userData) {
      const timer = setTimeout(() => {
          navigate(`/profile/${userData.id}`); // Redirect to the user's profile after 3 seconds
      }, 3000); // Wait 3 seconds
      
      return () => clearTimeout(timer); // Cleanup the timer
  }
}, [paymentSuccess, userData, navigate]);


   return (
      <div className="dashboard">
         <header className="dashboard-header">
    <h1>Welcome to OrangeBus Dashboard</h1>
    <nav>
        <ul>
            <li><Link to={`/profile/${userData?.id}`}>Profile</Link></li>
            <li><Link to="/">Logout</Link></li>
        </ul>
    </nav>
          </header>


          <main className="dashboard-content">
              <section className="search-form">
                  <h2>Search for Buses</h2>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="from">From:</label>
                          <select
                              id="from"
                              name="from"
                              value={formData.from}
                              onChange={handleChange}
                              required
                          >
                              <option value="">Select District</option>
                              {districts.map((district) => (
                                  <option key={district} value={district}>{district}</option>
                              ))}
                          </select>
                      </div>
                      <div className="form-group">
                          <label htmlFor="to">To:</label>
                          <select
                              id="to"
                              name="to"
                              value={formData.to}
                              onChange={handleChange}
                              required
                          >
                              <option value="">Select District</option>
                              {districts.map((district) => (
                                  <option key={district} value={district}>{district}</option>
                              ))}
                          </select>
                      </div>
                      <div className="form-group">
                          <label htmlFor="date">Date:</label>
                          <input
                              type="date"
                              id="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="tickets">Number of Tickets:</label>
                          <input
                              type="number"
                              id="tickets"
                              name="tickets"
                              min="1"
                              value={formData.tickets}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <button type="submit" className="btn">Search</button>
                  </form>
              </section>

              {/* Bus Selection Section */}
              {buses.length > 0 ? (
                  <section className="bus-selection">
                      <h2>Select a Bus</h2>
                      <ul>
                          {buses.map((bus) => (
                              <li key={bus.id} className="bus-option">
                                  <div>
                                      <h3>{bus.name}</h3>
                                      <p>From: {bus.from} To: {bus.to}</p>
                                      <p>Departure Time: {bus.time}</p>
                                      <p>Price per ticket (${bus.price}) x Tickets ({formData.tickets})</p>
                                      <button onClick={() => handleBusSelect(bus)} className="btn">Select</button>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </section>
              ) : (
                  noBusesAvailable && (
                      <section className="no-bus-message">
                          <h2>No Buses Available</h2> 
                          <p>Please try a different route or date.</p> 
                      </section> 
                  )
              )}

               {/* Payment Section */}
               {selectedBus && (
                  <section className="payment-section">
                      <h2>Payment for {selectedBus.name}</h2>
                      <p>From: {selectedBus.from}</p>
                      <p>To: {selectedBus.to}</p>
                      <p>Departure Time: {selectedBus.time}</p>
                      <p>Price: ${selectedBus.price} per ticket</p>

                      {/* Payment Form */}
                      <h3>Enter Payment Details</h3>
                      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                          <div className="form-group">
                          <label htmlFor="cardNumber">Card Number:</label>
                              <input type="text" id="cardNumber" required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="expiryDate">Expiry Date:</label>
                              <input type="text" id="expiryDate" placeholder="MM/YY" required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="cvv">CVV:</label>
                              <input type="text" id="cvv" required />
                          </div>
                          <button type="submit" className="btn" onClick={() => handlePayment(userData.id)} >Pay Now</button>
                      </form>
                  </section>
              )}

              {/* Payment Success Alert */}
              {paymentSuccess && (
                  <div className="alert">
                      <p>Payment successful! Thank you for your purchase.</p>
                      {/* No close button here */}
                  </div>
              )}
            </main>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>&copy; {new Date().getFullYear()} OrangeBus. All rights reserved.</p>
            </footer>

      </div >
  );
};

export default Dashboard;
