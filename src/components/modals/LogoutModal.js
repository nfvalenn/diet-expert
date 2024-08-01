import React from 'react';
import Modal from 'react-modal';
import { FaSignOutAlt } from 'react-icons/fa';

Modal.setAppElement('#root'); // Important for accessibility

const modalStyles = {
  content: {
    position: 'relative',
    width: '400px',
    maxWidth: '90%',
    margin: 'auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    outline: 'none',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LogoutModal = ({ isOpen, onRequestClose, onLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logout Confirmation"
      style={modalStyles}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Confirm Logout</h2>
      <p style={{ marginBottom: '1rem' }}>Are you sure you want to log out?</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: '#f56565',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e53e3e'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f56565'}
        >
          <FaSignOutAlt style={{ marginRight: '0.5rem' }} /> Logout
        </button>
        <button
          onClick={onRequestClose}
          style={{
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#edf2f7'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
