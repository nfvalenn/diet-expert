import React, { useState } from 'react';
import Modal from 'react-modal';

// Bind modal to your app element for accessibility
Modal.setAppElement('#root'); // Adjust if your root element has a different id

const AddAktivitasFisikModal = ({ isOpen, onRequestClose, onAddAktivitasFisik }) => {
  const [condition_code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [cf, setCf] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', { condition_code, category, description, cf });

    // Validate data
    if (!condition_code || !category || !description || !cf) {
      alert('Please fill in all fields');
      return;
    }

    // Validate CF value to be a number
    const cfValue = parseFloat(cf);
    if (isNaN(cfValue)) {
      alert('CF should be a valid number');
      return;
    }

    // Check if the callback function exists and is a function
    if (typeof onAddAktivitasFisik === 'function') {
      onAddAktivitasFisik({ condition_code, category, description, cf: cfValue });
    } else {
      console.error('onAddAktivitasFisik is not a function');
    }
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      background: 'white',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '500px',
      width: '90%',
      margin: '20px',
      position: 'relative',
    },
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyles = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
    marginBottom: '16px',
    width: '100%',
  };

  const buttonStyles = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const primaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const secondaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#6c757d',
    color: 'white',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Aktivitas Fisik"
      style={modalStyles}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>
        Add Aktivitas Fisik
      </h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <label style={{ marginBottom: '8px', color: '#333' }}>Kode</label>
        <input
          type="text"
          value={condition_code}
          onChange={(e) => setCode(e.target.value)}
          style={inputStyles}
          placeholder="Kode"
        />
        <label style={{ marginBottom: '8px', color: '#333' }}>Kategori</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyles}
          placeholder="Kategori"
        />
        <label style={{ marginBottom: '8px', color: '#333' }}>Deskripsi</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyles}
          placeholder="Deskripsi"
        />
        <label style={{ marginBottom: '8px', color: '#333' }}>CF</label>
        <input
          type="text"
          value={cf}
          onChange={(e) => setCf(e.target.value)}
          style={inputStyles}
          placeholder="CF"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={primaryButtonStyles}>Add</button>
          <button type="button" onClick={onRequestClose} style={secondaryButtonStyles}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAktivitasFisikModal;
