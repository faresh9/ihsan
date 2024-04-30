const pool = require('../ihsanModel');

const getAllTodos = async (req, res) => {
  const response = await pool.query('SELECT * FROM todos');
  res.json(response.rows);
};

const getTodo = async (req, res) => {
  const _id = req.params._id;
  const response = await pool.query('SELECT * FROM todos WHERE _id = $1', [_id]);
  res.json(response.rows[0]);
};

const createTodo = async (req, res) => {
    const { _id, title, color } = req.body;
    const response = await pool.query('INSERT INTO todos (_id, title, color) VALUES ($1, $2, $3)', [_id, title, color]);
    res.json(response.rows[0]);
  };

const updateTodo = async (req, res) => {
  const _id = req.params._id;
  const { title, color} = req.body;
  const response = await pool.query('UPDATE todos SET title = $1, color = $2 WHERE _id = $3', [title, color, _id]);
  res.json(response.rows[0]);
};

const deleteTodo = async (req, res) => {
  const _id = req.params._id;
  const response = await pool.query('DELETE FROM todos WHERE _id = $1', [_id]);
  res.json({ message: 'Todo deleted successfully' });
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};