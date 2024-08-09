import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Make sure you import the correct Axios instance

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous error messages

    try {
      const response = await api.post('/login', { email, password });
      const { role, token } = response.data; // Get role and token from the response

      // Store the token in local storage
      localStorage.setItem('authToken', token);

      // Set the token in the Axios instance for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/adminDashboard'); // Redirect to admin dashboard
      } else {
        navigate('/home'); // Redirect to user home
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div 
        className="w-1/2 bg-cover bg-center hidden md:block"
        style={{ 
          backgroundImage: "url('/bg-login.png')", 
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Display error messages */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="border p-2 w-full rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                className="border p-2 w-full rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-violet-400 text-white p-3 rounded-md w-full hover:bg-violet-500"
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Logging in...' : 'Login'} {/* Show loading state */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
