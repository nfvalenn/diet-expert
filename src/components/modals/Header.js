import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-violet-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Sistem Pakar Pola Makan Diabetes</h1>
      </div>
    </header>
  );
};

export default Header;
