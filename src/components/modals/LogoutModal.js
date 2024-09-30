import React from 'react';
import Modal from 'react-modal';

const LogoutModal = ({ isOpen, onRequestClose, onLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50" // Ensures modal is centered and on top
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40" // Adds background overlay
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-xl"> {/* Adjusted width and max-width */}
        <h2 className="text-xl text-center font-semibold mb-4">Konfirmasi Logout</h2>
        <p className="mb-6 text-center">Apakah anda yakin ingin keluar?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Keluar
          </button>
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Tidak
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
