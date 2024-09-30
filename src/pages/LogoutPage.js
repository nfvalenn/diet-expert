import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('/api/logout'); // Perform logout request
        navigate('/login'); // Redirect to login page after successful logout
      } catch (error) {
        console.error('Logout error:', error);
        // Optionally handle the error, show a message to the user, etc.
      }
    };

    performLogout(); // Call the logout function when the component mounts
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-xl font-semibold">Logging you out...</h1>
        <p className="mt-4">Please wait while we log you out.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
