import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutModal from './LogoutModal';

const Sidebar = ({ isAdmin }) => {
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsConditionDropdownOpen(!isConditionDropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log('User logged out');
    setIsLogoutModalOpen(false);
    // Redirect or perform other actions
  };

  return (
    <>
      <nav className="bg-violet-400 text-white w-64 min-h-screen p-4 shadow-lg">
        <ul>
          {isAdmin ? (
            <>
              <li className="mb-2">
                <Link to="/admin" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Admin Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/users" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Manage Users</Link>
              </li>
              <li className="mb-2 relative">
                <button 
                  onClick={toggleDropdown} 
                  className="block w-full p-2 rounded hover:bg-violet-500 transition-colors duration-200 text-left justify-between items-center"
                >
                  Condition
                  <span className={`transform transition-transform ${isConditionDropdownOpen ? 'rotate-180' : ''}`}>&#9662;</span>
                </button>
                {isConditionDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-full bg-violet-600 text-white rounded shadow-lg z-10">
                    <li>
                      <Link 
                        to="/admin/condition/bmi" 
                        className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200"
                      >
                        Indeks Massa Tubuh
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/physical-activity" 
                        className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200"
                      >
                        Aktivitas Fisik
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/blood-sugar" 
                        className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200"
                      >
                        Kadar Gula Darah
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/stress-level" 
                        className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200"
                      >
                        Tingkat Stress
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/hba1c" 
                        className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200"
                      >
                        HbA1c
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* New Rules Menu Item */}
              <li className="mb-2">
                <Link to="/admin/rules" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Rules</Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/articles" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Articles</Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/food" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Foods</Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/results" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Results</Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/consultation-history" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Consultation History</Link>
              </li>
              <li className="mt-4">
                <button 
                  onClick={() => setIsLogoutModalOpen(true)} 
                  className="block w-full p-2 rounded bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mb-2">
                <Link to="/user/profile" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Profile</Link>
              </li>
              <li className="mb-2">
                <Link to="/user/consultations" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Consultations</Link>
              </li>
              <li className="mb-2">
                <Link to="/user/articles" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Articles</Link>
              </li>
              <li className="mb-2">
                <Link to="/user/consultation-history" className="block p-2 rounded hover:bg-violet-500 transition-colors duration-200">Consultation History</Link>
              </li>
              <li className="mt-4">
                <button 
                  onClick={() => setIsLogoutModalOpen(true)} 
                  className="block w-full p-2 rounded bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
