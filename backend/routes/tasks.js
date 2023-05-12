var express = require('express');
var router = express.Router();
const TaskModel = require('../models/task-model');

router.get('/', async(_req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json("No tasks found");
    }
  } catch (error) {
      res.status(400).json(error);
  }
});

router.post('/add', async(req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json(task);
    }
   catch (error) {
      res.status(400).json(error);
  }
});

router.put('/endSession', async (req, res) => {
  try {
    const updatedTasks = await TaskModel.updateMany(
      { deleted: false },
      { $set: { deleted: true } }
    );
    res.status(200).json(updatedTasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:documentId', async(req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.documentId, { $set: { storyPoints: req.body.storyPoints }});
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
