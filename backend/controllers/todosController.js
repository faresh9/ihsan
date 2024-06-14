//backend/controllers/todosController.js
const pool = require('../ihsanModel');
const jwt = require('jsonwebtoken');

// Get user ID from JWT
const getUserId = (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('No Authorization header');
    return null;
  }

  const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
  if (!token) {
    console.log('No token found');
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded);
    return decoded.id;
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};

const getAllTodos = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('SELECT * FROM todos WHERE "userId" = $1', [userId]);
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getTodo = async (req, res) => {
  const _id = req.params._id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('SELECT * FROM todos WHERE _id = $1 AND "userId" = $2', [_id, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createTodo = async (req, res) => {
  const { _id, title, color } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('INSERT INTO todos (_id, title, color, "userId") VALUES ($1, $2, $3, $4) RETURNING *', [_id, title, color, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateTodo = async (req, res) => {
  const _id = req.params._id;
  const { title, color } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('UPDATE todos SET title = $1, color = $2 WHERE _id = $3 AND "userId" = $4 RETURNING *', [title, color, _id, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteTodo = async (req, res) => {
  const _id = req.params._id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('DELETE FROM todos WHERE _id = $1 AND "userId" = $2', [_id, userId]);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};