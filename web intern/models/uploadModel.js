const mongoose = require('mongoose');

// Define the schema for uploaded files
const uploadSchema = new mongoose.Schema({
  originalName: String,
  s3Url: String,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Upload', uploadSchema);