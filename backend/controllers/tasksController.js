// backend/controllers/tasksController.js
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

const getAllTasks = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getTask = async (req, res) => {
  const id = req.params.id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('SELECT * FROM tasks WHERE id = $1 AND "userId" = $2', [id, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createTask = async (req, res) => {
  const { name } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('INSERT INTO tasks (name, completed, "userId") VALUES ($1, $2, $3) RETURNING *', [name, false, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { name, completed } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 AND "userId" = $4 RETURNING *', [name, completed, id, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('DELETE FROM tasks WHERE id = $1 AND "userId" = $2', [id, userId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
