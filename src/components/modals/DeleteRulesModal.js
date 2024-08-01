import React from 'react';
import Modal from 'react-modal';

const DeleteRuleModal = ({ isOpen, onRequestClose, onDeleteRule }) => {
  const handleDelete = () => {
    onDeleteRule();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Rule Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this rule?</p>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded mr-2"
        >
          Delete
        </button>
        <button
          onClick={onRequestClose}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteRuleModal;
