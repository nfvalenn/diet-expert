// src/components/modals/EditFoodRecommendationModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditFoodRecommendationModal = ({ isOpen, onRequestClose, foodRecommendation, onEdit }) => {
  const [name, setName] = useState('');
  const [porsi, setPorsi] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (foodRecommendation) {
      setName(foodRecommendation.name);
      setPorsi(foodRecommendation.porsi);
      setWeight(foodRecommendation.weight);
      setCalories(foodRecommendation.calories);
      setProtein(foodRecommendation.protein);
      setFat(foodRecommendation.fat);
      setTime(foodRecommendation.time);
    }
  }, [foodRecommendation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFoodRecommendation = { ...foodRecommendation, name, porsi, weight, calories, protein, fat, time };
    onEdit(updatedFoodRecommendation);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Food Recommendation">
      <h2>Edit Food Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Porsi:</label>
          <input type="text" value={porsi} onChange={(e) => setPorsi(e.target.value)} required />
        </div>
        <div>
          <label>Weight:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>Calories:</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        </div>
        <div>
          <label>Protein:</label>
          <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} required />
        </div>
        <div>
          <label>Fat:</label>
          <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EditFoodRecommendationModal;
