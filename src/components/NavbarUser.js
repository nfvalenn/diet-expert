import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import apiClient from '../services/api'; // Correct import path

const UserNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout'); // Ensure this matches your backend route
      navigate('/login'); // Redirect after logout
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      closeModal(); // Close modal after attempting logout
    }
  };

  return (
    <>
      <nav className="bg-violet-400 text-white p-4 shadow-lg flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/articles" className="hover:text-gray-200">Artikel</Link>
          </li>
          <li>
            <Link to="/consultations/history" className="hover:text-gray-200">Riwayat Konsultasi</Link>
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
                    to="/profileuser"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                    onClick={openModal} // Open modal instead of directly logging out
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-semibold mb-4 text-center">Apakah anda yakin ingin keluar?</h2>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleLogout}
              className="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Ya
            </button>
            <button
              onClick={closeModal}
              className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Tidak
            </button>
          </div>
        </div>
      </div>      
      )}
    </>
  );
};

export default UserNavbar;
