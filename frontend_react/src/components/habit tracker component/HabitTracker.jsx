// HabitTracker.js
import React, { useEffect, useState } from 'react';
import Habit from './Habit';
import AddHabitForm from './AddHabitForm';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(storedHabits);
  }, []);

  const saveHabitsToLocalStorage = habits => {
    localStorage.setItem('habits', JSON.stringify(habits));
  };

  const addHabit = habitName => {
    const newHabit = { id: Date.now(), name: habitName, color: getRandomColor(), data: Array(7).fill(0) };
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabitsToLocalStorage(updatedHabits);
  };

  const removeHabit = id => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    setHabits(updatedHabits);
    saveHabitsToLocalStorage(updatedHabits);
  };

  const updateHabitData = (id, newData) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, data: newData } : habit
    );
    setHabits(updatedHabits);
    saveHabitsToLocalStorage(updatedHabits);
  };

  const updateHabitName = (id, newName) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, name: newName } : habit
    );
    setHabits(updatedHabits);
    saveHabitsToLocalStorage(updatedHabits);
  };

  const updateHabitColor = (id, newColor) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, color: newColor } : habit
    );
    setHabits(updatedHabits);
    saveHabitsToLocalStorage(updatedHabits);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Habit Tracker</h1>
      <AddHabitForm onAdd={addHabit} />
      <div className="w-full max-w-3xl mt-8">
        {habits.map(habit => (
          <Habit
            key={habit.id}
            id={habit.id}
            name={habit.name}
            color={habit.color}
            data={habit.data}
            onRemove={() => removeHabit(habit.id)}
            onUpdate={newData => updateHabitData(habit.id, newData)}
            onNameChange={(id, newName) => updateHabitName(id, newName)}
            onColorChange={(id, newColor) => updateHabitColor(id, newColor)}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
