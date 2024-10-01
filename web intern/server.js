require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const retrieveRoutes = require('./routes/retrieveRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Use routes for uploads and retrievals
app.use('/api/uploads', uploadRoutes); // For upload-related routes
app.use('/api/retrieve', retrieveRoutes); // For retrieval-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});