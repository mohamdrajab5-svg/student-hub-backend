const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getMyPosts,
} = require('../controllers/userController');

// All these routes are protected by the authMiddleware in server.js

// /api/users/profile
router.route('/profile').get(getUserProfile).put(updateUserProfile);

// /api/users/myposts
router.route('/myposts').get(getMyPosts);

module.exports = router;
