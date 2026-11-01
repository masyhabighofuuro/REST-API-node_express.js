const express = require('express');
const router = express.Router();
const basoController = require('../controller/basoController')

// router.get('/', (req,res) => {
//   return res.status(200).json({
//     message : "Berhasil!"
//   })
// })

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(`Berhasil menampilkan data ${id}`);
// });

// router.post('/', (req, res) => {
//   const { informasi } = req.body;
//   return res.status(201).json({
//     message: "Berhasil menambah data",
//     data: informasi
//   });
// });

// router.put('/:id', (req,res) => {
//   const { informasi } = req.body;
//   const { id } =req.params;
//   return res.status(200).json({
//     message:`Berhasil mengubah data ${id}`,
//     data: informasi
//   });
// });

// router.delete('/:id', (req, res) => {
//   const { id } =req.params;
//   return res.status(200).json({
//     message:`Berhasil menghapus data ${id}`
//   });
// });

// Implementasi GET
router.get('/', basoController.tampilData);
// Implementasi GET by ID
router.get('/:id', basoController.getById);
// Implementasi GET POST
router.post('/', basoController.tambahData);
// Implementasi GET PUT
router.put('/:id', basoController.ubahData);
// Implementasi GET DELETE
router.delete('/:id', basoController.hapusData);

module.exports = router;