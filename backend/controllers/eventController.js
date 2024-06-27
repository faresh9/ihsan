const pool = require('../ihsanModel');
const jwt = require('jsonwebtoken');

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

const getAllEvents = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try{
  const response = await pool.query('SELECT * FROM events WHERE "userId" = $1', [userId]);
  res.json(response.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getEvent = async (req, res) => {
  const id = req.params.id;
  const userId = getUserId(req);
  const response = await pool.query('SELECT * FROM events WHERE id = $1 AND "userId" = $2', [id, userId]);
  res.json(response.rows[0]);
};

const createEvent = async (req, res) => {
  const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
  const { id, title, theme, date} = req.body;
  const response = await pool.query('INSERT INTO events (id, title, theme, date, "userId") VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, title, theme, date, userId]);
  res.json(response.rows[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const { description, start, end, allDay } = req.body;
  const response = await pool.query('UPDATE events SET description = $1, start = $2, end = $3, allDay = $4 WHERE id = $5', [description, start, end, allDay, id]);
  res.json(response.rows[0]);
};
const deleteEvent = async (req, res) => {
  const id = req.params.id;
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await pool.query('DELETE FROM events WHERE id = $1 AND "userId" = $2', [id, userId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};