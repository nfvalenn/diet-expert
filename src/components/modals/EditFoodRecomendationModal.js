import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import api from '../../services/api'; // Ensure the path is correct

const EditFoodRecommendationModal = ({ isOpen, onRequestClose, foodRecommendation, onEdit }) => {
  const [name, setName] = useState('');
  const [porsi, setPorsi] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [time, setTime] = useState('');
  const [result_id, setResultId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch categories from backend when modal opens
      api.get('/results')
        .then((response) => {
          setCategories(response.data);
          setError(null); // Reset error if successful
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
          setError('Gagal mengambil data kategori.');
        });

      // Pre-fill form with the existing food recommendation data
      if (foodRecommendation) {
        setName(foodRecommendation.name);
        setPorsi(foodRecommendation.porsi);
        setWeight(foodRecommendation.weight);
        setCalories(foodRecommendation.calories);
        setProtein(foodRecommendation.protein);
        setFat(foodRecommendation.fat);
        setTime(foodRecommendation.time);
        setResultId(foodRecommendation.result_id);
      }
    }
  }, [isOpen, foodRecommendation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!result_id) {
      setError('Result ID is missing. Please select or assign a valid result.');
      return;
    }

    const updatedFoodRecommendation = {
      name,
      porsi,
      weight: Number(weight),
      calories: Number(calories),
      protein: Number(protein),
      fat: Number(fat),
      time,
      result_id,
    };

    // Validate input fields
    if (!name || !porsi || !weight || !calories || !protein || !fat || !time || !result_id) {
      setError('Please fill all required fields.');
      return;
    }

    // Send the updated food recommendation to the API
    api.put(`/foods/${foodRecommendation.id}`, updatedFoodRecommendation)
      .then((response) => {
        onEdit(response.data); // Notify parent component of the update
        resetForm();
      })
      .catch((error) => {
        console.error('Error updating food recommendation:', error.response?.data);
        setError('Failed to update food recommendation: ' + error.response?.data?.error);
      });
  };

  const resetForm = () => {
    setName('');
    setPorsi('');
    setWeight('');
    setCalories('');
    setProtein('');
    setFat('');
    setTime('');
    setResultId('');
    setError(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Food Recommendation"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto">
        <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Rekomendasi Makanan</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Porsi:</label>
            <input
              type="text"
              value={porsi}
              onChange={(e) => setPorsi(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Berat (gr):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Kalori:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Protein:</label>
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Lemak:</label>
            <input
              type="number"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Waktu:</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Waktu Makan</option>
              <option value="Sarapan">Sarapan</option>
              <option value="Makan Siang">Makan Siang</option>
              <option value="Makan Malam">Makan Malam</option>
              <option value="Cemilan">Cemilan</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Kategori:</label>
            <select
              value={result_id}
              onChange={(e) => setResultId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a result</option>
              {categories.map((result) => (
                <option key={result.id} value={result.id}>
                  {result.category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditFoodRecommendationModal;
