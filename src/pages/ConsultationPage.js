// src/pages/ConsultationPage.js

import React from 'react';
import ConsultationFormModal from '../components/modals/ConsultationForm';

const ConsultationPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="text-2xl font-bold mb-4">Consultation Page</h1>
      <ConsultationFormModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default ConsultationPage;
