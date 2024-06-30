//frontend_new/src/features/dashboard/components/HabitTracker.js
import React, { useState, useEffect } from 'react';
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// Helper function to generate a unique ID
const generateId = () => Math.floor(Math.random() * 1000000);

// Habit Card Component
const HabitCard = ({ id, day, tasks, progress, updateProgress, deleteHabit, deleteTask, updateHabitName, updateTask }) => {
  const [isEditingHabitName, setIsEditingHabitName] = useState(false);
  const [editedHabitName, setEditedHabitName] = useState(day);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  // Function to handle habit name edit toggle
  const toggleEditHabitName = () => {
    setIsEditingHabitName(!isEditingHabitName);
  };

  // Function to save the edited habit name
  const saveHabitName = () => {
    updateHabitName(id, editedHabitName);
    setIsEditingHabitName(false);
  };

  // Function to handle task edit toggle
  const toggleEditTask = (task) => {
    setTaskBeingEdited(task);
    setEditedTaskText(task);
  };

  // Function to save the edited task text
  const saveTaskText = (task) => {
    updateTask(id, task, editedTaskText);
    setTaskBeingEdited(null);
  };

  // Function to handle increment button click
  const handleIncrement = () => {
    const newProgress = Math.min(progress + 1, tasks.length); // Ensure progress doesn't exceed tasks length
    updateProgress(id, newProgress);
  };

  return (
    <div className="card bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <div className="flex justify-between items-center">
          {isEditingHabitName ? (
            <div className="flex w-full space-x-2">
              <input
                type="text"
                value={editedHabitName}
                onChange={(e) => setEditedHabitName(e.target.value)}
                className="input input-bordered w-full"
              />
              <button onClick={saveHabitName} className="btn btn-success btn-sm">Save</button>
              <button onClick={toggleEditHabitName} className="btn btn-secondary btn-sm">Cancel</button>
            </div>
          ) : (
            <>
              <h2 className="card-title text-lg font-semibold">{day}</h2>
              <div className="space-x-2">
                {/* <button onClick={toggleEditHabitName} className="btn btn-info btn-sm">Edit Habit</button> */}
                <PencilIcon onClick={toggleEditHabitName} className="h-6 w-6 text-gray-500 cursor-pointer" />
                {/* <button onClick={() => deleteHabit(id)} className="btn btn-error btn-sm">Delete Habit</button> */}
                <TrashIcon onClick={() => deleteHabit(id)} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500" />
              </div>
            </>
          )}
        </div>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center text-base">
              {taskBeingEdited === task ? (
                <div className="flex w-full space-x-2">
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button onClick={() => saveTaskText(task)} className="btn btn-success btn-sm">Save</button>
                  <button onClick={() => setTaskBeingEdited(null)} className="btn btn-secondary btn-sm">Cancel</button>
                </div>
              ) : (
                <>
                  {task}
                  <div className="space-x-2">
                    {/* <button  className="btn btn-info btn-sm">Edit</button> */}
                    <PencilIcon onClick={() => toggleEditTask(task)} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-grey-200" />
                    {/* <button onClick={() => deleteTask(id, task)} className="btn btn-error btn-sm">Delete</button> */}
                    <TrashIcon onClick={() => deleteTask(id, task)} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-600" />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max={tasks.length}
          ></progress>
          <p className="text-sm text-gray-600 mt-1">
            {progress} of {tasks.length} completed
          </p>
          {/* <button onClick={handleIncrement} className="btn btn-secondary mt-2">Increment Progress</button> */}
          <PlusCircleIcon onClick={handleIncrement}className="h-6 w-6 text-gray-500 cursor-pointer hover:text-green-400" />
        </div>
      </div>
    </div>
  );
};

// Main Component
const HabitTracker = () => {
  const [habitData, setHabitData] = useState([]);
  const [day, setDay] = useState("");
  const [tasks, setTasks] = useState("");
  const [progress, setProgress] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); // Track the current date

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }

        const habits = await response.json();
        setHabitData(habits);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, []);

  useEffect(() => {
    const checkDateChange = () => {
      const today = new Date().toISOString().split('T')[0];
      if (today !== currentDate) {
        setCurrentDate(today);
        resetProgress();
      }
    };

    // Check every minute for date change
    const intervalId = setInterval(checkDateChange, 60000); // 60,000 ms = 1 minute

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [currentDate]);

  const resetProgress = () => {
    setHabitData((prevHabits) =>
      prevHabits.map((habit) => ({ ...habit, progress: 0 }))
    );

    // Optionally, persist the reset progress to the server
    habitData.forEach(async (habit) => {
      try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/habits/${habit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ progress: 0 })
        });
      } catch (error) {
        console.error(`Error resetting progress for habit ${habit.id}:`, error);
      }
    });
  };

  const addHabit = async () => {
    if (!day || !tasks) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const newHabit = {
        id: generateId(),
        day,
        tasks: tasks.split(',').map(task => task.trim()), // Split tasks by comma and trim spaces
        progress: parseInt(progress, 10) || 0 // Ensure progress is an integer
      };

      console.log('Adding habit:', JSON.stringify(newHabit));
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newHabit)
      });

      if (!response.ok) {
        throw new Error('Failed to create habit');
      }

      setHabitData([...habitData, newHabit]);
      // Clear the input fields
      setDay("");
      setTasks("");
      setProgress("");
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  // Function to update habit progress
  const updateProgress = async (id, newProgress) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ progress: newProgress })
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      // Update progress in the local state
      setHabitData(habitData.map(habit =>
        habit.id === id ? { ...habit, progress: newProgress } : habit
      ));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Function to delete a habit
  const deleteHabit = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }

      // Remove the habit from the local state
      setHabitData(habitData.filter(habit => habit.id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (habitId, task) => {
    try {
      const habit = habitData.find(h => h.id === habitId);
      if (!habit) return;

      const updatedTasks = habit.tasks.filter(t => t !== task);
      const updatedProgress = Math.min(habit.progress, updatedTasks.length);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tasks: updatedTasks, progress: updatedProgress })
      });

      if (!response.ok) {
        throw new Error('Failed to update tasks');
      }

      // Update tasks and progress in the local state
      setHabitData(habitData.map(h =>
        h.id === habitId ? { ...h, tasks: updatedTasks, progress: updatedProgress } : h
      ));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to update the habit name
  const updateHabitName = async (id, newName) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ day: newName })
      });

      if (!response.ok) {
        throw new Error('Failed to update habit name');
      }

      // Update the habit name in the local state
      setHabitData(habitData.map(habit =>
        habit.id === id ? { ...habit, day: newName } : habit
      ));
    } catch (error) {
      console.error('Error updating habit name:', error);
    }
  };

  // Function to update a task
  const updateTask = async (habitId, oldTask, newTask) => {
    try {
      const habit = habitData.find(h => h.id === habitId);
      if (!habit) return;

      const updatedTasks = habit.tasks.map(t => t === oldTask ? newTask : t);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tasks: updatedTasks })
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Update tasks in the local state
      setHabitData(habitData.map(h =>
        h.id === habitId ? { ...h, tasks: updatedTasks } : h
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {habitData.map((habit, index) => (
        <HabitCard
          key={index}
          {...habit}
          updateProgress={updateProgress}
          deleteHabit={deleteHabit}
          deleteTask={deleteTask}
          updateHabitName={updateHabitName}
          updateTask={updateTask}
        />
      ))}
      <div className="w-full flex flex-col items-center mt-4">
        <input type="text" value={day} onChange={e => setDay(e.target.value)} placeholder="Day" className="input input-bordered mb-2" />
        <input type="text" value={tasks} onChange={e => setTasks(e.target.value)} placeholder="Tasks (comma-separated)" className="input input-bordered mb-2" />
        <input type="number" value={progress} onChange={e => setProgress(e.target.value)} placeholder="Progress" className="input input-bordered mb-2" />
        <button onClick={addHabit} className="btn btn-primary">Add Habit</button>
      </div>
    </div>
  );
};

export default HabitTracker;
