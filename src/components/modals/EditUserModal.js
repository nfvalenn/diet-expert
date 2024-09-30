import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import Modal from 'react-modal'; // Import Modal from react-modal

// Ensure to set the app element for accessibility
Modal.setAppElement('#root');

const EditUserModal = ({ isOpen, onRequestClose, onUpdateUser, user }) => {
  const [updatedUser, setUpdatedUser] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update form fields when the `user` prop changes
  useEffect(() => {
    if (user) {
      setUpdatedUser({
        id: user.id || '', // Ensure ID is included
        username: user.username || '',
        email: user.email || '',
        password: '', // Leave the password blank by default
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      await onUpdateUser(updatedUser); // Ensure the user ID is included in the request
      setSuccess('User updated successfully!');
      onRequestClose(); // Optionally close modal after update
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    }
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
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={updatedUser.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          value={updatedUser.password}
          onChange={handleInputChange}
          placeholder="Password (Leave blank if unchanged)"
          className="border border-gray-300 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="flex justify-center space-x-2 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Batal
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
