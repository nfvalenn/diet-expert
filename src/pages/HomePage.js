// src/pages/HomePage.js

import React, { useState } from 'react';
import UserNavbar from '../components/NavbarUser';
import ConsultationFormModal from '../components/modals/ConsultationForm';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <UserNavbar />
      <div className="flex-1 flex">
        <img 
          src="/logo-landingpage.jpg" 
          alt="Company Logo" 
          className="w-1/2 h-auto object-cover transform scale-75"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className='bg-white p-6 rounded-lg shadow-lg border'>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">Sistem Pakar Pola Makan</h2>
              <p className="mb-6 text-lg text-center">Beritahu kami kondisi anda</p>
              <button
                onClick={openModal}
                className="bg-violet-400 text-white px-6 py-2 rounded-lg hover:bg-violet-500 transition-colors duration-100 w-48 text-center block border border-violet-500"
              >
                Mulai Konsultasi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <ConsultationFormModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default HomePage;
