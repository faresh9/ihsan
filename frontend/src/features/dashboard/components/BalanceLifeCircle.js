// BalanceLifeCircle.js
import React, { useState } from 'react';
import PolarAreaChart from './PolarAreaChart';

const categories = [
  "Spiritual", "Health", "Career", "Finances", "Relationships", 
  "Personal Growth", 
];

const BalanceLifeCircle = () => {
  const [ratings, setRatings] = useState(new Array(categories.length).fill(1)); // Default ratings

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">Balance Life Circle <p className='badge badge-warning gap-2'>BETA</p></h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <label className="text-lg">{category}</label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={ratings[index]} 
              onChange={(e) => handleRatingChange(index, e.target.value)} 
              className="range range-primary" 
            />
            <span>{ratings[index]}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-4">Save Assessment</button>

      {/* Polar Area Chart */}
      <PolarAreaChart labels={categories} data={ratings} />
    </div>
  );
};

export default BalanceLifeCircle;
