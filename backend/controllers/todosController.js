const pool = require('../ihsanModel');

const getAllTodos = async (req, res) => {
  const response = await pool.query('SELECT * FROM todos');
  res.json(response.rows);
};

const getTodo = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  res.json(response.rows[0]);
};

const createTodo = async (req, res) => {
    const { id, title, description } = req.body;
    const response = await pool.query('INSERT INTO todos (id, title, description) VALUES ($1, $2, $3)', [id, title, description]);
    res.json(response.rows[0]);
  };

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const response = await pool.query('UPDATE todos SET title = $1, description = $2 WHERE id = $3', [title, description, id]);
  res.json(response.rows[0]);
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  res.json({ message: 'Todo deleted successfully' });
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};