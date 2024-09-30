import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const ProfileModal = ({ isOpen, onRequestClose, user }) => {
  const [formData, setFormData] = useState({ username: user.username, email: user.email });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        onRequestClose(response.data); // Pass updated user data
      } else {
        setError('An unexpected error occurred.');
      }
    } catch (error) {
      setError('Error updating profile.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(null)}
      contentLabel="Edit Profile"
      className="fixed inset-0 bg-white shadow-lg p-4 mx-auto max-w-lg mt-20"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div>
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        <button
          type="button"
          onClick={() => onRequestClose(null)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 ml-4"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
