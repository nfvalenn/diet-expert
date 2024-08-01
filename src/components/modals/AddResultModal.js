import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const AddResultModal = ({ isOpen, onRequestClose, onAddResult }) => {
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [calorieRange, setCalorieRange] = useState('');
  const [description, setDescription] = useState('');
  const [dietPlan, setDietPlan] = useState([]);
  const [foodRecommendations, setFoodRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/food-recommendations')
      .then(response => response.json())
      .then(data => setFoodRecommendations(data))
      .catch(error => console.error('Error fetching food recommendations:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResult = {
      code,
      category,
      calorie_range: calorieRange,
      description,
      dietPlan,
    };
    onAddResult(newResult);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Result">
      <h2 className="text-2xl font-bold mb-4">Add New Result</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Calorie Range</label>
          <input
            type="text"
            value={calorieRange}
            onChange={(e) => setCalorieRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Diet Plan</label>
          <select
            multiple
            value={dietPlan}
            onChange={(e) => setDietPlan(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {foodRecommendations.map(recommendation => (
              <option key={recommendation.id} value={recommendation.id}>
                {recommendation.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Result</button>
      </form>
    </Modal>
  );
};

export default AddResultModal;
