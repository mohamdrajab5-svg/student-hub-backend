const express = require('express');
const router = express.Router();

// --- OLD IMPORTS ---
const { registerUser, loginUser } = require('../controllers/authController');

// --- NEW IMPORTS (ADD THESE) ---
const crypto = require('crypto');
const User = require('../models/User'); // Adjust path if needed
const sendEmail = require('../utils/sendEmail'); // The file we just made

// --- OLD ROUTES (KEEP THESE) ---
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- ADD THESE TWO NEW ROUTES ---

// 1. FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  // 1) Find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // We don't want to tell them the user doesn't exist (security)
    return res.status(200).json({ message: 'Email sent.' });
  }

  // 2) Generate the random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 3) Hash token and save it to user model
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 4) Set token to expire in 10 minutes
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  // 5) Create the reset URL for the frontend
  const resetURL = `https://mohamdrajab5-svg.github.io/the-web/reset-password.html?token=${resetToken}`;

  // 6) Create the email message
  const message = `Forgot your password? Click the link to set a new one: \n\n ${resetURL} \n\nIf you didn't forget your password, please ignore this email. This link is valid for 10 minutes.`;

  // 7) Send the email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({ status: 'success', message: 'Token sent to email!' });
  } catch (err) {
    console.error('EMAIL ERROR:', err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(500).json({ message: 'Error sending email. Please try again.' });
  }
});

// 2. RESET PASSWORD
router.put('/reset-password/:token', async (req, res) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // 2) Find the user by the hashed token and check if it's expired
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // $gt = "greater than" now
  });

  // 3) If token is invalid or expired
  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or has expired' });
  }

  // 4) Set the new password
  user.password = req.body.password; // The auth logic will hash this on save
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 5) Send success response
  res.status(200).json({ message: 'Password reset successfully!' });
});

// --- END OF NEW ROUTES ---

module.exports = router;
