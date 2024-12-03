const express = require('express');
const multer = require('multer'); // Multer'ı import et
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Dosyaların 'uploads' klasörüne kaydedilmesini sağlar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosya adını zaman damgası ile oluşturur
  }
});

const upload = multer({ storage: storage }); // 'upload' nesnesi oluşturuluyor

const app = express();
const PORT = 3000;

// Statik dosyalar (HTML ve CSS)
app.use(express.static('public'));

// Ana sayfa (home) rotası
app.get('/', (req, res) => {
  res.send('Ana sayfa - Lütfen /lock veya /unlock sayfalarına gidin');
});

// Lock işlemi
app.post('/lock', upload.single('file'), (req, res) => {
  const password = req.body.password;
  const file = req.file;

  if (!file || !password) {
    return res.status(400).send('Dosya ve şifre gerekli!');
  }

  const algorithm = 'aes-256-ctr';
  const cipher = crypto.createCipher(algorithm, password);
  const input = fs.createReadStream(file.path);
  const encryptedPath = `encrypted/${file.originalname}.enc`;

  const output = fs.createWriteStream(encryptedPath);
  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    res.download(encryptedPath, `${file.originalname}.enc`, () => {
      fs.unlinkSync(file.path); // Geçici dosyayı sil
    });
  });
});

// Unlock işlemi
app.post('/unlock', upload.single('file'), (req, res) => {
  const password = req.body.password;
  const file = req.file;

  if (!file || !password) {
    return res.status(400).send('Dosya ve şifre gerekli!');
  }

  const algorithm = 'aes-256-ctr';
  const decipher = crypto.createDecipher(algorithm, password);
  const input = fs.createReadStream(file.path);
  const decryptedPath = `decrypted/${file.originalname.replace('.enc', '')}`;

  const output = fs.createWriteStream(decryptedPath);
  input.pipe(decipher).pipe(output);

  output.on('finish', () => {
    res.download(decryptedPath, `${file.originalname.replace('.enc', '')}`, () => {
      fs.unlinkSync(file.path); // Geçici dosyayı sil
    });
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
