// BalanceLifeCircle.js
import React, { useState } from 'react';
import PolarAreaChart from './PolarAreaChart';

const categories = new Map();
categories.set('Spiritual', 1);
categories.set('Health', 1);
categories.set('Career', 1);
categories.set('Finances', 1);
categories.set('Relationships', 1);
categories.set('Personal Growth', 1);

const BalanceLifeCircle = () => {
  const [ratings, setRatings] = useState(Array.from(categories.values()));

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = Number(value); // Convert value to a number
    setRatings(newRatings);
  };

  const keys = Array.from(categories.keys());

  const onSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const promises = keys.map(async (category, index) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hex/${category}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rating: ratings[index] })
        });

        if (!response.ok) {
          throw new Error(`Failed to save ${category}`);
        }
      });

      await Promise.all(promises);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        Balance Life Circle <span className="badge badge-warning gap-2">BETA</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {keys.map((category, index) => (
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
      <button className="btn btn-primary mt-4" onClick={onSave}>
        Save Assessment
      </button>

      {/* Polar Area Chart */}
      <PolarAreaChart labels={keys} data={ratings} />
    </div>
  );
};

export default BalanceLifeCircle;
