require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  ssl: {
    require: true,
    rejectUnauthorized: false // This setting is necessary if the SSL certificate is self-signed or not trusted by default.
  }
});

module.exports = pool;
