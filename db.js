require('dotenv').config();

const mysql = require('mysql2');

// Create a connection pool with promise support
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}).promise();

// Test the database connection
async function testConnection() {
    try {
        const [rows, fields] = await pool.query('SELECT 1');
        console.log('Connected to the database');
    } catch (   error) {
        console.error('Error connecting to the database: ' + error.message);
    }   
}

testConnection();

module.exports = pool;

