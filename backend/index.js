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
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This setting is necessary if the SSL certificate is self-signed or not trusted by default.
      }
    },
  }
);

// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
