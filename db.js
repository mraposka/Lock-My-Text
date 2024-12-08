const mysql = require('mysql2');

// Veritabanı bağlantısı (Docker ortam değişkenleri)
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'file_upload',
});

module.exports = db;
