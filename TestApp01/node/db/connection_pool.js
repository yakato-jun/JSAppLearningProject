'use strict';
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql',
  user: 'node',
  password: 'node',
  database: 'node',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;