const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middlewares/multerConfig');

const router = express.Router();

// Route to upload a file
router.post('/', upload.single('image'), uploadFile);

module.exports = router;