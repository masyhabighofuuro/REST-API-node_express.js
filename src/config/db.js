const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const requiredConfig = ['DB_HOST', 'DB_USER', 'DB_NAME'];
const missingConfig = requiredConfig.filter(key => !process.env[key]);
if (process.env.DB_PASSWORD === undefined) {
  missingConfig.push('DB_PASSWORD');
}

if (missingConfig.length > 0) {
  throw new Error(`Konfigurasi database belum lengkap: ${missingConfig.join(', ')}`);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection()
  .then(conection => {
    console.log('berhasil terkoneksi ke database');
    conection.release();
  })
  .catch(err => {
    console.log(err);
  })

module.exports = pool;