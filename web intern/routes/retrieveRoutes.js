const express = require('express');
const { getUploads } = require('../controllers/retrieveController');

const router = express.Router();

// Route to retrieve all uploaded files
router.get('/', getUploads);

module.exports = router;