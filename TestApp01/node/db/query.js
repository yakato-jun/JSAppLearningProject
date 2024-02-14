'use strict';
const pool = require('./connection_pool');

const export_functions = {};
export_functions.fetchUsers = async () => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM USER');
    
    console.log(rows);
    console.log(fields);
  }
  catch (err) {
    console.error("error: " + err);
  }
};

export_functions.findUserByName = async (username) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM USER WHERE username = ?', [username]);
    console.log(rows);
    return rows[0];
  }
  catch (err) {
    console.error("error: " + err);
  }
};

export_functions.findUserById = async (id) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM USER WHERE user_id = ?', [id]);
    return rows[0];
  }
  catch (err) {
    console.error("error: " + err);
  }
}

module.exports = export_functions;