const User = require('../models/User'); // We need the User model
const Post = require('../models/Post'); // We need the Post model

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // req.user.uid comes from the Firebase token
    let user = await User.findOne({ firebaseId: req.user.uid });

    if (!user) {
      // If user is not in our DB, create them
      user = new User({
        firebaseId: req.user.uid,
        name: req.user.name,
        email: req.user.email,
      });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const { name, bio } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { firebaseId: req.user.uid },
      { $set: { name, bio } },
      { new: true, upsert: true } // upsert: true will create if it doesn't exist
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all posts by the logged-in user
// @route   GET /api/users/myposts
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.uid }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getMyPosts,
};
