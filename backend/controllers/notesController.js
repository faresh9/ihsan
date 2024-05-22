const pool = require('../ihsanModel');

const getAllNotes = async (req, res) => {
  const response = await pool.query('SELECT * FROM notes');
  res.json(response.rows);
};

const getNote = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
  res.json(response.rows[0]);
};

const createNote = async (req, res) => {
  const { id, text, date } = req.body;
  const response = await pool.query('INSERT INTO notes (id, text, date) VALUES ($1, $2, $3)', [id, text, date]);
  res.json(response.rows[0]);
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { text, date } = req.body;
  const response = await pool.query('UPDATE notes SET text = $1, date = $2 WHERE id = $3 RETURNING *', [text, date, id]);
  res.json(response.rows[0]);
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
  res.json({ message: 'Note deleted successfully' });
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};