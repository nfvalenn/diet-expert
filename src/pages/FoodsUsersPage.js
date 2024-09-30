// src/pages/FoodRecommendationPage.js

import React from 'react';

const FoodRecommendationPage = ({ recommendations }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Rekomendasi Makanan</h3>
      {recommendations && recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index} className="mb-2">
              {recommendation}
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada rekomendasi makanan yang tersedia.</p>
      )}
    </div>
  );
};

export default FoodRecommendationPage;
