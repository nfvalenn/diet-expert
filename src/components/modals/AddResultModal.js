import React, { useState } from 'react';
import Modal from 'react-modal';

const AddResultModal = ({ isOpen, onRequestClose, onAddResult }) => {
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [calorieRange, setCalorieRange] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResult = {
      code,
      category,
      calorie_range: calorieRange,
      description,
    };
    onAddResult(newResult);
    setCode('');
    setCategory('');
    setCalorieRange('');
    setDescription('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Result"
      className="modal-content w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Tambah Result</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Kode</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kategori</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kalori Range</label>
          <input
            type="text"
            value={calorieRange}
            onChange={(e) => setCalorieRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="submit"
            className="w-32 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tambah Result
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="w-32 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddResultModal;
