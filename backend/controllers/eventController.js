const pool = require('../ihsanModel');

const getAllEvents = async (req, res) => {
  const response = await pool.query('SELECT * FROM events');
  res.json(response.rows);
};

const getEvent = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  res.json(response.rows[0]);
};

const createEvent = async (req, res) => {
  const { id, title, theme, date} = req.body;
  const response = await pool.query('INSERT INTO events (id, title, theme, date) VALUES ($1, $2, $3, $4) RETURNING *', [id, title, theme, date]);
  res.json(response.rows[0]);
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const { description, start, end, allDay } = req.body;
  const response = await pool.query('UPDATE events SET description = $1, start = $2, end = $3, allDay = $4 WHERE id = $5', [description, start, end, allDay, id]);
  res.json(response.rows[0]);
};
const deleteEvent = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM events WHERE id = $1', [id]);
  res.json({ message: 'Event deleted successfully' });
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};