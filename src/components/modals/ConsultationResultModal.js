import React from 'react';
import ReactDOM from 'react-dom';

const ConsultationResultsModal = ({ isOpen, onRequestClose, results }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">Consultation Results</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">IMT</label>
            <p>{results.imt}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">IMT Condition</label>
            <p>{results.imtCondition}</p>
          </div>
          {/* Add more fields as needed */}
        </div>
        <div className="flex justify-end">
          <button onClick={onRequestClose} className="bg-blue-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConsultationResultsModal;
