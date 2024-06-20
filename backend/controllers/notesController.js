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

const getAllNotes = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('SELECT * FROM notes WHERE "userId" = $1', [userId]);
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getNote = async (req, res) => {
  const id = req.params.id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('SELECT * FROM notes WHERE id = $1 AND "userId" = $2', [id, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createNote = async (req, res) => {
  const { id, text, date } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('INSERT INTO notes (id, text, date, "userId") VALUES ($1, $2, $3, $4) RETURNING *', [id, text, date, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { text, date } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('UPDATE notes SET text = $1, date = $2 WHERE id = $3 AND "userId" = $4 RETURNING *', [text, date, id, userId]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('DELETE FROM notes WHERE id = $1 AND "userId" = $2', [id, userId]);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
