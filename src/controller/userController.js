const db = require('../config/db');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'username dan password harus diisi'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await db.execute(query, [username, hashedPassword]);
    return res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil'
    })
  } catch(error) {
      next(error);
  }
}

module.exports = {
  register
}