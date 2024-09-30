import React, { useState } from 'react';
import Modal from 'react-modal';

// Ensure to set the app element for accessibility
Modal.setAppElement('#root');

const AddUserModal = ({ isOpen, onRequestClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = () => {
    onAddUser(newUser);
    setNewUser({ username: '', email: '', password: '' });
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
          overflow: 'hidden', // Prevent scrollbars inside modal
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
      contentLabel="Add User Modal"
    >
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">Tambah User</h2>
      <form className="space-y-3">
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="flex justify-center space-x-2 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-violet-400 text-white py-2 px-4 rounded hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add User
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
