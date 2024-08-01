import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <img src='/logo-landingpage.jpg' alt="Landing Page Logo" className="mx-auto mb-8" style={{ maxWidth: '30%', height: 'auto' }} />
      <h1 className="text-2xl font-bold">Sistem Pakar Pola Makan Diabetes Melitus Tipe 2</h1>
      <p className="text-lg mb-8">Konsultasikan pola makanmu kepada ahlinya</p>
      <div className="flex flex-col items-center space-y-4">
        <Link to="/register" className="bg-violet-400 text-white py-2 px-8 rounded text-center w-60">Register</Link>
        <Link to="/login" className="bg-violet-400 text-white py-2 px-8 rounded text-center w-60">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
