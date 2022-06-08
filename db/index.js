const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../config/config.env') });
``
const pool = new Pool({  
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'hunter',
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
}

