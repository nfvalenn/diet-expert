// src/components/UserFormModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UserFormModal = ({ isOpen, onRequestClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Password should not be pre-filled
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { username, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [username]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...user, ...formData });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Form"
      classusername="modal"
      overlayClassusername="overlay"
    >
      <h2 classusername="text-xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div classusername="mb-4">
          <label classusername="block text-gray-700 mb-2">username</label>
          <input
            type="text"
            username="username"
            value={formData.username}
            onChange={handleChange}
            classusername="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div classusername="mb-4">
          <label classusername="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            username="email"
            value={formData.email}
            onChange={handleChange}
            classusername="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div classusername="mb-4">
          <label classusername="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            username="password"
            value={formData.password}
            onChange={handleChange}
            classusername="border border-gray-300 rounded p-2 w-full"
            required={!user} // Password is required only when adding a new user
          />
        </div>
        <div classusername="flex justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            classusername="mr-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            classusername="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {user ? 'Update' : 'Add'} User
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
