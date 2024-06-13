const pool = require('../ihsanModel');

const getAllEvents = async (req, res) => {
  const response = await pool.query('SELECT * FROM events');
  res.json(response.rows);
};

const getEvent = async (req, res) => {
  const _id = req.params._id;
  const response = await pool.query('SELECT * FROM events WHERE _id = $1', [_id]);
  res.json(response.rows[0]);
};

const createEvent = async (req, res) => {
  const { _id, description, start, end, allDay } = req.body;
  const response = await pool.query('INSERT INTO events (_id, description, start, "end", "allDay") VALUES ($1, $2, $3, $4, $5)', [_id, description, start, end, allDay]);
  res.json(response.rows[0]);
};

const updateEvent = async (req, res) => {
  const _id = req.params._id;
  const { description, start, end, allDay } = req.body;
  const response = await pool.query('UPDATE events SET description = $1, start = $2, end = $3, allDay = $4 WHERE _id = $5', [description, start, end, allDay, _id]);
  res.json(response.rows[0]);
};
const deleteEvent = async (req, res) => {
  const _id = req.params._id;
  const response = await pool.query('DELETE FROM events WHERE _id = $1', [_id]);
  res.json({ message: 'Event deleted successfully' });
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};