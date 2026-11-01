# REST API Node.js + Express

REST API sederhana menggunakan Node.js, Express, dan MySQL. API menyediakan registrasi dan login pengguna, serta operasi CRUD untuk data produk yang dilindungi JSON Web Token (JWT).

## Teknologi

- Node.js
- Express 5
- MySQL (`mysql2`)
- bcrypt untuk hash password
- JSON Web Token untuk autentikasi

## Persiapan

Pastikan Node.js, npm, dan MySQL sudah terpasang dan server MySQL sedang berjalan.

1. Clone repository dan masuk ke folder project.
2. Pasang dependency:

   ```bash
   npm install
   ```

3. Buat database MySQL, lalu tabel yang digunakan API. Contoh skema:

   ```sql
   CREATE DATABASE rest_api;
   USE rest_api;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE product (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nama VARCHAR(255) NOT NULL,
     harga DECIMAL(10, 2) NOT NULL
   );
   ```

4. Buat file `src/.env` dengan konfigurasi berikut, lalu isi sesuai pengaturan MySQL lokal:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=rest_api
   JWT_SECRET=ganti-dengan-secret-random-yang-panjang
   ```

   `JWT_SECRET` harus sama saat membuat dan memverifikasi token. Jangan unggah `src/.env` atau secret asli ke GitHub.

5. Jalankan server:

   ```bash
   npm run dev
   ```

Server berjalan di `http://localhost:3006`.

## Endpoint

Semua request yang mengirim body harus menggunakan `Content-Type: application/json`.

### Registrasi

`POST /users/register`

```json
{
  "username": "contoh",
  "password": "password-yang-kuat"
}
```

Password disimpan dalam bentuk hash bcrypt. Respons berhasil menggunakan status `201`.

### Login

`POST /users/login`

```json
{
  "username": "contoh",
  "password": "password-yang-kuat"
}
```

Respons berhasil berisi token JWT:

```json
{
  "message": "Login berhasil!",
  "token": "<jwt>"
}
```

### Produk

Semua endpoint produk memerlukan token pada header `Authorization`. Kirim nilai token JWT secara langsung, tanpa awalan `Bearer`, karena middleware saat ini memverifikasi nilai header tersebut secara langsung.

| Method | Endpoint | Keterangan | Body |
| --- | --- | --- | --- |
| `GET` | `/` | Mendapatkan semua produk | — |
| `GET` | `/:id` | Mendapatkan produk berdasarkan ID | — |
| `POST` | `/` | Menambahkan produk | `{"nama":"Baso","harga":15000}` |
| `PUT` | `/:id` | Mengubah produk | `{"nama":"Baso","harga":18000}` |
| `DELETE` | `/:id` | Menghapus produk | — |

Contoh mengambil produk:

```bash
curl http://localhost:3006/ \
  -H "Authorization: <jwt>"
```

Contoh menambahkan produk:

```bash
curl -X POST http://localhost:3006/ \
  -H "Content-Type: application/json" \
  -H "Authorization: <jwt>" \
  -d "{\"nama\":\"Baso\",\"harga\":15000}"
```

## Catatan

- Aturan `.gitignore` mengabaikan file `.env`. Namun, jika `src/.env` sudah pernah dilacak Git, aturan tersebut tidak menghapusnya dari repository. Sebelum push, keluarkan file itu dari index tanpa menghapus salinan lokal dengan `git rm --cached src/.env`.
- Jika kredensial dalam file `.env` pernah ter-push ke repository publik, ganti kredensial tersebut. Menghapus file dari commit terbaru tidak menghapusnya dari riwayat Git.
- Kolom `users.password` harus cukup panjang untuk menyimpan hash bcrypt; gunakan `VARCHAR(255)`.
- Script `npm test` belum dikonfigurasi untuk menjalankan test.
