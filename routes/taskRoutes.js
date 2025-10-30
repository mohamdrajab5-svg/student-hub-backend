const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// All these routes are protected by the authMiddleware in server.js

// /api/tasks
router.route('/').get(getTasks).post(createTask);

// /api/tasks/:id
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
