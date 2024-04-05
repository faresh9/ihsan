// Habit.js
import React, { useState } from 'react';
import HabitGraph from './HabitGraph';

const Habit = ({ id, name, color, data, onRemove, onUpdate, onNameChange, onColorChange }) => {
  const [habitData, setHabitData] = useState(data);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedColor, setEditedColor] = useState(color);

  const handleDataChange = newData => {
    setHabitData(newData);
    onUpdate(newData);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedName(name);
      setEditedColor(color);
    }
  };

  const handleNameChange = e => {
    setEditedName(e.target.value);
  };

  const handleColorChange = e => {
    setEditedColor(e.target.value);
  };

  const saveChanges = () => {
    onNameChange(id, editedName);
    onColorChange(id, editedColor);
    toggleEditMode();
  };

  return (
    <div className="bg-gray-800 rounded-md p-4 mb-4">
      <div className="flex justify-between items-center">
        {editMode ? (
          <>
            <input type="text" value={editedName} onChange={handleNameChange} className="mr-2 p-2 bg-gray-900 text-white border border-gray-600 rounded-md" />
            <input type="color" value={editedColor} onChange={handleColorChange} className="mr-2 p-1 border border-gray-600 rounded-md" />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={saveChanges}>Save</button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-white mb-2">{name}</h2>
            <div className="w-4 h-4 rounded-full bg-gray-300 mb-2" style={{ backgroundColor: color }}></div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-3" onClick={toggleEditMode}>Edit</button>
          </>
        )}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3" onClick={onRemove}>Remove Habit</button>
      </div>
      <HabitGraph data={habitData} color={color} onDataChange={handleDataChange} />
    </div>
  );
};

export default Habit;
