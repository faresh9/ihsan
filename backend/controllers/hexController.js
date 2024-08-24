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

  const getAllValues = async(req,res) => {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const { rows } = await pool.query('SELECT * FROM hex WHERE "userId"= $1', [userId]);
    res.json(rows);
      } catch (error) {
        console.error('Error fetching values:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

  }

  const createValue = async(req,res) => {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { category, value } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO hex ("userId", category, value) VALUES ($1, $2, $3) RETURNING *', [userId, category, value]);
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error creating value:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const updateValue = async(req,res) => {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { category } = req.params;
    const { value } = req.body;
    try {
      const { rows } = await pool.query('UPDATE hex SET value = $1 WHERE category = $2 AND "userId" = $3 RETURNING *', [value, category, userId]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Value not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error('Error updating value:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    getAllValues,
    createValue,
    updateValue
  }