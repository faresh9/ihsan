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


const getAllUserInfo = async (req, res) => {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
    const response = await pool.query('SELECT * FROM "userInfo" WHERE "userId" = $1', [userId]);
    res.json(response.rows);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

};

const createUserInfo = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    console.log('Request body:', req.body); // Log the entire request body
    // Directly destructure req.body without assuming it's an array
    const { id, name, email, title, place, about, language, timezone, image, gender } = req.body;
    console.log('Extracted values:', { id, name, email, title, place, about, language, timezone, image, gender }); // Log destructured variables

    const response = await pool.query(
      'INSERT INTO "userInfo" (id, name, email, title, place, about, language, timezone, image, gender, "userId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [id, name, email, title, place, about, language, timezone, image, gender, userId]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
 
    const getUserInfo = async (req, res) => {
        const id = req.params.id;
        const userId = getUserId(req);
        const response = await pool.query('SELECT * FROM "userInfo" WHERE id = $1 AND "userId" = $2', [id, userId]);
        res.json(response.rows[0]);
    }

    const updateUserInfo = async (req, res) => {
        const id = req.params.id;
        const userId = getUserId(req);
        const {name, email, title, place, about, language, timezone, image, gender} = req.body;
        const response = await pool.query('UPDATE "userInfo" SET name = $1, email = $2, title = $3, place = $4, about = $5, language = $6, timezone = $7, image = $8, gender = $9 WHERE id = $10 AND "userId" = $11 RETURNING *', [name, email, title, place, about, language, timezone, image, gender, id, userId]);
        res.json(response.rows[0]); 
    } 

module.exports = {
    getAllUserInfo,
    createUserInfo,
    getUserInfo,
    updateUserInfo
};