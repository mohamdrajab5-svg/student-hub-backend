const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions)); 
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Success! Your backend server is running.' });
});

// === API Routes ===

// Public routes (no auth needed)
app.use('/api/contact', require('./routes/contactRoutes'));

// Protected routes (user must be logged in with Firebase)
app.use('/api/posts', authMiddleware, require('./routes/postRoutes'));

// We have removed the lines for taskRoutes and userRoutes because the files don't exist.

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
