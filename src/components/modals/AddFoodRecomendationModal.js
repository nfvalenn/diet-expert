// src/components/modals/AddFoodRecommendationModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const AddFoodRecommendationModal = ({ isOpen, onRequestClose, onAdd }) => {
  const [name, setName] = useState('');
  const [porsi, setPorsi] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFoodRecommendation = { name, porsi, weight, calories, protein, fat, time };
    onAdd(newFoodRecommendation);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Food Recommendation">
      <h2>Add Food Recommendation</h2>
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
        <button type="submit">Add</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddFoodRecommendationModal;
