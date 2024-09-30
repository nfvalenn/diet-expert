import React from 'react';
import Modal from 'react-modal';

const ConsultationDetailModal = ({ isOpen, onRequestClose, consultation }) => {
  if (!consultation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Consultation Details"
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto my-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>
      <p><strong>ID:</strong> {consultation.id}</p>
      <p><strong>Date:</strong> {new Date(consultation.createdAt).toLocaleDateString()}</p>
      <p><strong>Weight:</strong> {consultation.weight} kg</p>
      <p><strong>Height:</strong> {consultation.height} cm</p>
      <p><strong>Age:</strong> {consultation.age} years</p>
      <p><strong>Gender:</strong> {consultation.gender}</p>
      <p><strong>BMI:</strong> {consultation.imt.toFixed(2)}</p>
      <p><strong>Activity Level:</strong> {consultation.activityLevel.name}</p>
      <p><strong>Blood Sugar:</strong> {consultation.bloodSugar.name}</p>
      <p><strong>HbA1c:</strong> {consultation.hba1c.name}</p>
      <p><strong>Stress Level:</strong> {consultation.stressLevel.name}</p>
      <p><strong>Result:</strong> {consultation.Result ? consultation.Result.category : 'No result available'}</p>

      <button
        onClick={onRequestClose}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </Modal>
  );
};

export default ConsultationDetailModal;
