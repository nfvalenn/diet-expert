import React from 'react';

function FoodRecommendationList({ recommendations }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Food Recommendations</h2>
      <ul className="list-disc pl-5">
        {recommendations.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodRecommendationList;
