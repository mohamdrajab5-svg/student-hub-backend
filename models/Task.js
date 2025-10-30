const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    // This links the task to the Firebase user
    user: {
      type: String, // This is the Firebase ID (req.user.uid)
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
