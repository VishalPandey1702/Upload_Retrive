const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const Upload = require('../models/uploadModel');

// AWS S3 configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,  // Ensure this is correctly set in .env
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // From .env
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // From .env
  },
  signatureVersion: 'v4',  // Ensure you are using Signature Version 4
});

// Function to handle file upload
const uploadFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.file.filename,
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Delete the file from local storage
    fs.unlinkSync(filePath);

    // Save metadata to MongoDB
    const newUpload = new Upload({
      originalName: req.file.originalname,
      s3Url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`,
    });

    await newUpload.save();

    res.json({
      message: 'File uploaded successfully',
      fileUrl: newUpload.s3Url,
    });
  } catch (error) {
    console.error('Error while uploading file:', error);
    res.status(500).json({ message: 'File upload failed', error });
  }
};

module.exports = { uploadFile };