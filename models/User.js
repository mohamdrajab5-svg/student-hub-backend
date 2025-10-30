const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    // This is the Firebase UID (e.g., "Ua9z9lSTSaqYBWJe_Xfc-Q")
    firebaseId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
    },
    bio: {
      type: String,
      default: '', // Add the bio field for the profile page
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// We no longer need the password hashing or compare functions

const User = mongoose.model('User', userSchema);
module.exports = User;
