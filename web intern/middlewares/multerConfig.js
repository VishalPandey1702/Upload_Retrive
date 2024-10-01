const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const randomName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, randomName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;