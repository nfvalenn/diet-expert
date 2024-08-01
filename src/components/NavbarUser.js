import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const UserNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-violet-400 text-white p-4 shadow-lg flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/home" className="hover:text-gray-200">Home</Link>
        </li>
        <li>
          <Link to="/articles" className="hover:text-gray-200">Articles</Link>
        </li>
        <li>
          <Link to="/consultation-history" className="hover:text-gray-200">Consultation History</Link>
        </li>
      </ul>
      <div className="relative">
        <FaUserCircle
          className="text-2xl cursor-pointer hover:text-gray-200"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
