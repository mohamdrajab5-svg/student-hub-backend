const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware'); // <-- You imported this
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN // Read the origin from your Render environment
};
app.use(cors(corsOptions)); 

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Success! Your backend server is running.' });
});

// === API Routes ===
// Public routes (no auth needed)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Protected routes (user must be logged in with Firebase)
// We add the authMiddleware here
app.use('/api/posts', authMiddleware, require('./routes/postRoutes'));
app.use('/api/tasks', authMiddleware, require('./routes/taskRoutes'));
app.use('/api/users', authMiddleware, require('./routes/userRoutes'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
