require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://ihsan-beta.vercel.app', 'http://localhost:3001'], // Update with your frontend URLs
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));

// Database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
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
const hexRoutes = require('./routes/hex');

app.use('/events', eventRoutes);
app.use('/tasks', tasksRoutes);
app.use('/notes', noteRoutes);
app.use('/auth', authRouter);
app.use('/habits', habitsRoutes);
app.use('/user', userRoutes);
app.use('/hex', hexRoutes);

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
