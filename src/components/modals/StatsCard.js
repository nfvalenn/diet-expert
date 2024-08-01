import React from 'react';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl text-violet-400 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
