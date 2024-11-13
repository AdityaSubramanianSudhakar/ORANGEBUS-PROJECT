import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams for URL parameters
import axios from 'axios'; // Import Axios
import '../styles/profile.css'; // Ensure that the styling is correct

const Profile = () => {
    const { id } = useParams(); // Get user ID from URL parameters
    const navigate = useNavigate(); // Initialize useNavigate
    const [userData, setUserData] = useState(null); // State for user data
    const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`); // Fetch user by ID
                setUserData(response.data); // Set user data if found
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchUserData();
    }, [id]); // Dependency array includes id

    // Handle toggling the edit mode
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // Handle input changes during profile editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value }); // Update user data in state
    };

    // Handle saving the updated profile data
    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:3000/user/${userData.id}`, userData); // Update user data
            alert('Profile updated successfully!');
            setIsEditing(false); // Exit edit mode after saving changes
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    // Handle navigation back to the dashboard
    const handleBack = () => {
        navigate(`/dashboard/${userData?.username}`);
    };

    // Loading state
    if (loading) return <div>Loading...</div>;

    // Handle case where no user data is found
    if (!userData) return <div>No user data available.</div>;

    return (
        <div className="profile-page">
            {/* Back Button */}
            <button className="btn btn-back" onClick={handleBack}>
                &#8592; Back to Dashboard {/* Back arrow symbol */}
            </button>

            {/* Profile Container */}
            <div className="profile-container">
                <h2>{userData.name || userData.username}'s Profile</h2>

                <div className="profile-details">
                    {isEditing ? (
                        <>
                            {['name', 'email', 'mobile_number', 'age', 'gender'].map((field) => (
                                field === 'gender' ? (
                                    <label key={field}>
                                        Gender:
                                        <select name={field} value={userData[field] || ''} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </label>
                                ) : (
                                    <label key={field}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                                        <input
                                            type={field === 'age' ? 'number' : 'text'}
                                            name={field}
                                            value={userData[field] || ''}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                )
                            ))}
                        </>
                    ) : (
                        <>
                            <p><strong>Username:</strong> {userData.username}</p>
                            {userData.name && <p><strong>Name:</strong> {userData.name}</p>}
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Mobile Number:</strong> {userData.mobile_number || 'Not provided'}</p>
                            <p><strong>Age:</strong> {userData.age || 'Not provided'}</p>
                            <p><strong>Gender:</strong> {userData.gender || 'Not provided'}</p>
                        </>
                    )}
                </div>

                {/* Booking History */}
                {userData.booking_history && userData.booking_history.length > 0 && (
                    <>
                        <h3>Booking History</h3>
                        <ul className="booking-history">
                            {userData.booking_history.map((booking) => (
                                <li key={booking.booking_id}>
                                    <p><strong>Booking ID:</strong> {booking.booking_id}</p>
                                    <p><strong>Date:</strong> {booking.date}</p>
                                    <p><strong>Details:</strong> {booking.details}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Action Buttons */}
                {!isEditing ? (
                    <button className="btn" onClick={handleEditToggle}>Edit Profile</button>
                ) : (
                    <button className="btn" onClick={handleSaveChanges}>Save Changes</button>
                )}
            </div>
        </div>
    );
};

export default Profile;
