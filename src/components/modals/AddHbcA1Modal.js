// src/components/modals/AddHba1cModal.js
import React, { useState } from 'react';
import Modal from 'react-modal'; // Pastikan Modal diimpor dari library yang Anda gunakan

const AddHba1cModal = ({ isOpen, onRequestClose, onAddCondition }) => {
  const [condition_code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [cf, setCf] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCondition({ condition_code, category, description, cf });
    setCode('');
    setCategory('');
    setDescription('');
    setCf('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">Tambah HbA1c</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Kode</label>
            <input
              type="text"
              value={condition_code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">CF</label>
            <input
              type="text"
              value={cf}
              onChange={(e) => setCf(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-32"
            >
              Tambah
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-500 text-white p-2 rounded w-32"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddHba1cModal;
