import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;

      // Validate token
      if (typeof token !== 'string') {
        throw new Error('Token is not a valid string');
      }

      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Decode token to retrieve the role
      try {
        const decodedToken = jwtDecode(token); // Correctly call jwtDecode function
        const userRole = decodedToken.role; // Ensure you are decoding and assigning the correct role
        console.log('User role:', userRole); // Debug: Log user role

        // Redirect based on role
        if (userRole === 'admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/home');
        }
      } catch (decodeError) {
        console.error('Token decoding failed:', decodeError);
        setError('Token decoding failed.');
        return;
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
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
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
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
