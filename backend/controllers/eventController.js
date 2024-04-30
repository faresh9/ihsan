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
  const { title, start_time, end_time, allDay } = req.body;
  const response = await pool.query('INSERT INTO events (title, start_time, end_time, allDay) VALUES ($1, $2, $3, $4)', [title, start_time, end_time, allDay]);
  res.json(response.rows[0]);
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const { title, start_time, end_time, allDay } = req.body;
  const response = await pool.query('UPDATE events SET title = $1, start_time = $2, end_time = $3, allDay = $4 WHERE id = $5', [title, start_time, end_time, allDay, id]);
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