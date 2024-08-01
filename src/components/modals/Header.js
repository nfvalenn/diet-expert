import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-violet-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">DietExpert</h1>
        <nav>
          <Link to="/" className="mr-4 hover:text-violet-200">Home</Link>
          <Link to="/login" className="hover:text-violet-200">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
