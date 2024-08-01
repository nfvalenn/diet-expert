import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Ensure to set the app element for accessibility
Modal.setAppElement('#root');

const EditUserModal = ({ isOpen, onRequestClose, onUpdateUser, user }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user); // Update form when user prop changes
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = () => {
    onUpdateUser(updatedUser);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
      contentLabel="Edit User Modal"
    >
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">Edit User</h2>
      <form className="space-y-3">
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="text"
          name="role"
          value={updatedUser.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
