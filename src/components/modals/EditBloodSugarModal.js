// src/components/modals/EditBloodSugarModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditBloodSugarModal = ({ isOpen, onRequestClose, condition, onEditBloodSugar }) => {
  const [condition_code, setCode] = useState(condition?.condition_code || '');
  const [category, setCategory] = useState(condition?.category || '');
  const [description, setDescription] = useState(condition?.description || '');
  const [cf, setCf] = useState(condition?.cf || '');

  useEffect(() => {
    if (condition) {
      setCode(condition.condition_code);
      setCategory(condition.category);
      setDescription(condition.description);
      setCf(condition.cf);
    }
  }, [condition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditBloodSugar({ ...condition, condition_code, category, description, cf });
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
        <h2 className="text-xl font-bold mb-4">Edit Kondisi Gula Darah</h2>
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
              type="number"
              value={cf}
              onChange={(e) => setCf(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-center space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-32"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-500 text-white p-2 w-32 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditBloodSugarModal;
