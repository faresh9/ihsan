require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Database
const sequelize = new Sequelize('ihsan_db', 'postgres', 'fares1234', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Routes
const tasksRoutes = require('./routes/tasks');
const eventRoutes = require('./routes/events');
const noteRoutes = require('./routes/notes');
const authRouter = require('./routes/auth');
const habitsRoutes = require('./routes/habits');
const userRoutes = require('./routes/user');

app.use('/events', eventRoutes);
app.use('/tasks', tasksRoutes);
app.use('/notes', noteRoutes);
app.use('/auth', authRouter);
app.use('/habits', habitsRoutes);
app.use('/user', userRoutes);


// Server
app.listen(3000, () => console.log('Server is running on port 3000'));