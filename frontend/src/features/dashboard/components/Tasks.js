import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000); // Adjust range as needed
  };

  const onAddTask = async () => {
    try {
      const newTask = {
        id: generateRandomId(), // Generate a random ID
        name: taskName,
        completed: false,
      };

      console.log('Adding task:', newTask);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const createdTask = await response.json();
      setTaskName('');
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const onDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const onToggleTaskCompletion = async (id) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      const updatedTask = updatedTasks.find((task) => task.id === id);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="card bordered">
      <div className="card-body">
        <h2 className="card-title">Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="p-2 flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                className="checkbox checkbox-primary"
                onChange={() => onToggleTaskCompletion(task.id)}
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.name}
              </span>
              <button
                className="btn btn-error btn-outline btn-sm"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="input"
          />
          <button
            className="btn btn-neutral mt-2 ml-2"
            onClick={onAddTask}
            disabled={!taskName.trim()}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
