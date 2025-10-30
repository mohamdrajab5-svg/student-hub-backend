const Task = require('../models/Task'); // We'll need to create this model

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // We find tasks that match the user's Firebase ID (from the authMiddleware)
    const tasks = await Task.find({ user: req.user.uid });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { content } = req.body;

  try {
    const newTask = new Task({
      content,
      user: req.user.uid, // We assign the task to the logged-in user
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a task (e.g., mark as completed)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns the task
    if (task.user.toString() !== req.user.uid) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Just update the isCompleted field
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { isCompleted: req.body.isCompleted },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns the task
    if (task.user.toString() !== req.user.uid) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
