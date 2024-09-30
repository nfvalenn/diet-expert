import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoutModal from './LogoutModal';
import apiClient from '../../services/api'; // Adjust path as needed

const Sidebar = ({ isAdmin }) => {
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook
  const location = useLocation(); // Get current location

  const toggleDropdown = () => {
    setIsConditionDropdownOpen(!isConditionDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout'); // Adjust to match your backend API
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLogoutModalOpen(false); // Close the modal after logout
    }
  };

  // Function to check if a link is active
  const isLinkActive = (path) => location.pathname === path;

  // Use effect to open condition dropdown if any condition link is active
  useEffect(() => {
    if ([
      '/admin/condition/bmi',
      '/admin/condition/physical-activity',
      '/admin/condition/blood-sugar',
      '/admin/condition/stress-level',
      '/admin/condition/hba1c'
    ].some((path) => isLinkActive(path))) {
      setIsConditionDropdownOpen(true);
    } else {
      setIsConditionDropdownOpen(false);
    }
  }, [location.pathname]); // Depend on location.pathname to run whenever the route changes

  return (
    <>
      <nav className="bg-violet-400 text-white w-64 min-h-screen p-4 shadow-lg">
        <ul>
          {isAdmin ? (
            <>
              <li className="mb-2">
                <Link 
                  to="/adminDashboard" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/adminDashboard') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Admin Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/admin/users" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/users') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Manage Users
                </Link>
              </li>
              <li className="mb-2 relative">
                <button 
                  onClick={toggleDropdown} 
                  className="block w-full p-2 rounded hover:bg-violet-500 transition-colors duration-200 text-left justify-between items-center"
                >
                  Kondisi
                  <span className={`transform transition-transform ${isConditionDropdownOpen ? 'rotate-180' : ''}`}>&#9662;</span>
                </button>
                {isConditionDropdownOpen && (
                  <ul className="mt-2 w-full bg-violet-600 text-white rounded shadow-lg">
                    <li>
                      <Link 
                        to="/admin/condition/bmi" 
                        className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/condition/bmi') ? 'bg-violet-700' : 'hover:bg-violet-500'}`}
                      >
                        Indeks Massa Tubuh
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/physical-activity" 
                        className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/condition/physical-activity') ? 'bg-violet-700' : 'hover:bg-violet-500'}`}
                      >
                        Aktivitas Fisik
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/blood-sugar" 
                        className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/condition/blood-sugar') ? 'bg-violet-700' : 'hover:bg-violet-500'}`}
                      >
                        Kadar Gula Darah
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/stress-level" 
                        className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/condition/stress-level') ? 'bg-violet-700' : 'hover:bg-violet-500'}`}
                      >
                        Tingkat Stress
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/condition/hba1c" 
                        className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/condition/hba1c') ? 'bg-violet-700' : 'hover:bg-violet-500'}`}
                      >
                        HbA1c
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-2">
                <Link 
                  to="/admin/rules" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/rules') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Aturan
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/admin/articles" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/articles') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Artikel
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/admin/food" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/food') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Makanan
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/admin/results" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/results') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Kebutuhan Kalori
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/admin/consultation-history" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/admin/consultation-history') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Riwayat Konsultasi
                </Link>
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
                <Link 
                  to="/user/profile" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/user/profile') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/user/consultations" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/user/consultations') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Consultations
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/user/articles" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/user/articles') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Articles
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/user/consultation-history" 
                  className={`block p-2 rounded transition-colors duration-200 ${isLinkActive('/user/consultation-history') ? 'bg-violet-600' : 'hover:bg-violet-500'}`}
                >
                  Consultation History
                </Link>
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
