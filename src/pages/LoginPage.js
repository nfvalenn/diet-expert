import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Pastikan Anda mengimpor instance Axios yang benar

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      const { role } = response.data; // Dapatkan informasi peran dari respons

      if (role === 'admin') {
        navigate('/adminDashboard'); // Arahkan ke dashboard admin
      } else {
        navigate('/home'); // Arahkan ke profil pengguna
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div 
        className="w-1/2 bg-cover bg-center hidden md:block"
        style={{ 
          backgroundImage: "url('/bg-login.png')", 
          backgroundSize: 'contain', // Mengatur gambar untuk sepenuhnya terlihat
          backgroundPosition: 'center', // Posisi gambar di tengah
          backgroundRepeat: 'no-repeat' // Mencegah gambar diulang
        }}
      ></div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
