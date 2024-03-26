// AddHabitForm.js
import React, { useState } from 'react';

const AddHabitForm = ({ onAdd }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (habitName.trim()) {
      onAdd(habitName.trim());
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter habit name"
        value={habitName}
        onChange={e => setHabitName(e.target.value)}
        className="mr-2 p-2 border border-gray-300"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Habit</button>
    </form>
  );
};

export default AddHabitForm;
