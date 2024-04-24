const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();

// Middleware
app.use(bodyParser.json());

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
//const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
//const eventRoutes = require('./routes/events');

//app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
//app.use('/events', eventRoutes);

// Server
app.listen(3000, () => console.log('Server is running on port 3000'));