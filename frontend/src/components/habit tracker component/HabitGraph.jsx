// HabitGraph.js
import React from 'react';

const HabitGraph = ({ data, color, onDataChange }) => {
  const handleDataUpdate = index => {
    const newData = [...data];
    newData[index] += 1;
    onDataChange(newData);
  };

  return (
    <div className="flex justify-between">
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 mb-2" style={{ backgroundColor: color }}></div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1" onClick={() => handleDataUpdate(index)}>+</button>
          <span className="mt-2">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default HabitGraph;
