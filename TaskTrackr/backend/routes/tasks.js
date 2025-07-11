const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const User = require('../models/User'); // Required for checking if user exists, though primary ops are via authMiddleware

// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const newTask = new Task({
      user: req.user.id, // From authMiddleware
      title,
      description,
      dueDate,
      status,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get all tasks for a user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/:id
// @desc    Get a specific task by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (dueDate) taskFields.dueDate = dueDate;
  if (status) taskFields.status = status;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true } // Return the modified document
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
