const express = require('express');
const cors = require('cors');
require('dotenv').config(); // <-- 1. ADD THIS LINE
const connectDB = require('./config/db'); // <-- 2. ADD THIS LINE
connectDB()


const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ message: 'Success! Your backend server is running.' });
});
// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
