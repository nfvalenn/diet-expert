import React, { useState } from 'react';
import Modal from 'react-modal';
import ConsultationFormModal from '../components/modals/ConsultationForm';

Modal.setAppElement('#root');

const ConsultationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultationResult, setConsultationResult] = useState(null);

  const handleModalClose = (result) => {
    setIsModalOpen(false);
    if (result) {
      setConsultationResult(result);
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Consultation Page</h1>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Start Consultation
      </button>

      {/* Modal for Consultation Form */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="relative bg-white p-6 max-w-lg mx-auto rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        contentLabel="Consultation Form Modal"
        closeTimeoutMS={200}
      >
        <ConsultationFormModal onRequestClose={handleModalClose} />
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </Modal>

      {/* Display consultation results if available */}
      {consultationResult && (
        <div className="mt-4 p-4 border rounded bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2">Consultation Results</h2>
          <ul className="list-disc pl-5">
            {consultationResult.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;
