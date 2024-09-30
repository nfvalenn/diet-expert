import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditResultModal = ({ isOpen, onRequestClose, result, onEditResult }) => {
  const [code, setCode] = useState(result?.code || '');
  const [category, setCategory] = useState(result?.category || '');
  const [calorieRange, setCalorieRange] = useState(result?.calorie_range || '');
  const [description, setDescription] = useState(result?.description || '');

  useEffect(() => {
    if (result) {
      setCode(result.code);
      setCategory(result.category);
      setCalorieRange(result.calorie_range);
      setDescription(result.description);
    }
  }, [result]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditResult({
      ...result,
      code,
      category,
      calorie_range: calorieRange,
      description,
    });
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
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Edit Konsultasi Hasil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium mb-1 text-gray-700">Kode</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium mb-1 text-gray-700">Kategori</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="calorieRange" className="block text-sm font-medium mb-1 text-gray-700">Kalori Range</label>
            <input
              id="calorieRange"
              type="text"
              value={calorieRange}
              onChange={(e) => setCalorieRange(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">Deskripsi</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default EditResultModal;
