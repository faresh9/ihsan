//backend/controllers/habitsController.js
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

  const getAllHabits = async (req, res) => {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        const habitsResult = await pool.query('SELECT * FROM habits WHERE "userId" = $1', [userId]);
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
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const habitsResult = await pool.query(
          'INSERT INTO habits (id, day, progress, tasks,"userId") VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [id, day, progress, tasks, userId]
        );

        res.status(201).json({ message: 'Habit created successfully' });
      } catch (error) {
        console.error('Error creating habit:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteHabit = async (req, res) => {
    const id = req.params.id;
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        const habitsResult = await pool.query('DELETE FROM habits WHERE id = $1 AND "userId" = $2', [id, userId]);
        if (habitsResult.rowCount === 0) {
          return res.status(404).json({ message: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
      } catch (error) {
        console.error('Error deleting habit:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const updateHabit = async (req, res) => {
  const id = req.params.id;
  const { day, tasks, progress } = req.body;
  const userId = getUserId(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch the current habit data
    const currentHabitResult = await pool.query(
      'SELECT * FROM habits WHERE id = $1 AND "userId" = $2',
      [id, userId]
    );

    if (currentHabitResult.rowCount === 0) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const currentHabit = currentHabitResult.rows[0];

    // Determine the new values by merging current and provided data
    const updatedDay = day !== undefined ? day : currentHabit.day;
    const updatedTasks = tasks !== undefined ? tasks : currentHabit.tasks;
    const updatedProgress = progress !== undefined ? progress : currentHabit.progress;

    // Update the habit with only the provided fields
    const updateResult = await pool.query(
      'UPDATE habits SET day = $1, tasks = $2, progress = $3 WHERE id = $4 AND "userId" = $5 RETURNING *',
      [updatedDay, updatedTasks, updatedProgress, id, userId]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
    getAllHabits,
    createHabit,
    // getHabit,
     updateHabit,
    deleteHabit,
  };