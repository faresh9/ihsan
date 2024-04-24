const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "fares1234",
  host: "localhost",
  port: 5432,
  database: "ihsan_db"
});

module.exports = pool;