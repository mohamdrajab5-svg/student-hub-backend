const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');

// --- THIS IS THE FIX ---
// 1. Import the middleware directly, not as { protect }
const authMiddleware = require('../middleware/authMiddleware'); 

// @route /api/posts

// Anyone can GET posts (this route is not protected)
router.route('/').get(getPosts);

// 2. Use the correct middleware function name: authMiddleware
router.route('/').post(authMiddleware, createPost); 

module.exports = router;
