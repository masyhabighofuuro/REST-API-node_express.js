const express = require('express');
const router = express.Router();
const basoController = require('../controller/basoController')
const auth = require('../middleware/auth');

// Implementasi GET
router.get('/', auth, basoController.tampilData);
// Implementasi GET by ID
router.get('/:id', auth, basoController.getById);
// Implementasi GET POST
router.post('/', auth, basoController.tambahData);
// Implementasi GET PUT
router.put('/:id', auth, basoController.ubahData);
// Implementasi GET DELETE
router.delete('/:id', auth, basoController.hapusData);

module.exports = router;