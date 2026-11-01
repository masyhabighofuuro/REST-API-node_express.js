const db = require("../config/db");

const tampilData = async (req, res, next) => {
  try {
    const query = "SELECT * FROM product";
    const [rows] = await db.query(query);
    await res.status(200).json({
      status: "success",
      message: "Berhasilkan menampilkan semua data",
      data: rows,
    });
  } catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM product WHERE id = ?";
    const [rows] = await db.query(query, id);
    
    if(rows.length === 0) {
      return res.status(400).json({
        message: 'Data tidak ditemukan'
      })
    }

    return res.status(200).json({
      status: 'success',
      message: `Berhasil menampilkan data dengan id ${id}`,
      data: rows
    });
  } catch (error) {
    next(error)
  }
};

const tambahData = async (req, res, next) => {
  try {
    const data = {
      nama: req.body.nama,
      harga: req.body.harga,
    }

    if (!req.body.nama || !req.body.harga) {
      return res.status(400).json({
        message: 'Nama dan harga harus diisi'
      })
    }

    if (isNaN(req.body.harga)) {
      return res.status(400).json({
        message: 'Harga harus berupa angka'
      })
    }

    const query = "INSERT INTO product (nama, harga) VALUES (?, ?)";
    await db.execute(query, [data.nama, data.harga]);
    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambahkan data ke database'
    });
  } catch (error) {
    throw error;
  }
};

const ubahData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = {
      nama: req.body.nama,
      harga: req.body.harga,
    }

    if (!req.body.nama || !req.body.harga) {
      return res.status(400).json({
        message: 'Nama dan harga harus diisi'
      })
    }

    if (isNaN(req.body.harga)) {
      return res.status(400).json({
        message: 'Harga harus berupa angka'
      })
    }

    const query = "UPDATE product SET nama = ?, harga = ? WHERE id = ?";
    await db.execute(query, [data.nama, data.harga, id]);
    return res.status(200).json({
      status: 'success',
      message: "Berhasil mengubah data"
    });
  } catch (error) {
    next(error)
  }
};

const hapusData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM product WHERE id = ?";
    await db.execute(query, [id]);
    return res.status(200).json({
      status: 'success',
      message: "berhasil menghapus data"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  tampilData,
  getById,
  tambahData,
  ubahData,
  hapusData,
};
