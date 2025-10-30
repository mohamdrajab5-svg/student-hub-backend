const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    // --- THIS IS THE FIX ---
    // Change the user type from ObjectId to String
    user: {
      type: String, // This is the Firebase ID (req.user.uid)
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false, // e.g., 'News', 'Events', 'Resources'
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
