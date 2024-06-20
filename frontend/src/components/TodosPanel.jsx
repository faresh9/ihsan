import  { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const TodosPanel = () => {
    const [todos, setTodos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }
      
          const response = await fetch('http://localhost:3000/todos', {
            headers: {
              'Authorization': `Bearer ${token}`, // Include 'Bearer' before the token
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }
      
          const todos = await response.json();
          setTodos(todos);
        };
      
        fetchTodos();
      }, []);

const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

     return (
    <>
      <button onClick={toggleDrawer} className="fixed right-4 top-4 z-50">
        {isOpen ? 'Close' : 'Open'} Todos
      </button>
      <div
        className={`fixed right-4 top-4 w-80 bg-gray-900 text-white rounded-lg shadow-lg p-4 transition-transform duration-200 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Todos</h2>
        <div className="overflow-y-auto max-h-96">
          {todos.map((todo) => (
            <div key={nanoid()} className="bg-gray-800 rounded-lg p-2 mb-2">
              <h3 className="text-lg font-medium">{todo.title}</h3>
              <p className="text-sm text-gray-300">{todo.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodosPanel;
