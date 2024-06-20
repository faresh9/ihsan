//backend/controllers/habitsController.js
const pool = require('../ihsanModel');
// const jwt = require('jsonwebtoken');

// // Get user ID from JWT
// const getUserId = (req) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       console.log('No Authorization header');
//       return null;
//     }
  
//     const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
//     if (!token) {
//       console.log('No token found');
//       return null;
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('Token decoded successfully:', decoded);
//       return decoded.id;
//     } catch (err) {
//       console.error('Token verification failed:', err.message);
//       return null;
//     }
//   };

  const getAllHabits = async (req, res) => {
    // const userId = getUserId(req);
    // if (!userId) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }
  
    try {
        const habitsResult = await pool.query('SELECT * FROM habits');
        const habits = habitsResult.rows;
    
        
    

    
        res.json(habits);
      } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };



const createHabit = async (req, res) => {
    const { id, day, tasks, progress } = req.body;
    console.log('Received data:', req.body);
   // const userId = getUserId(req);
  

    try {
        const habitsResult = await pool.query(
          'INSERT INTO habits (id, day, progress, tasks) VALUES ($1, $2, $3, $4) RETURNING *',
          [id, day, progress, tasks]
        );
    
        
    
        res.status(201).json({ message: 'Habit created successfully' });
      } catch (error) {
        console.error('Error creating habit:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {
    getAllHabits,
    createHabit,
    // getNote,
    // createNote,
    // updateNote,
    // deleteNote,
  };