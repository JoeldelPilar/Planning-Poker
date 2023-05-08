const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  storyPoints: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
})


module.exports = mongoose.model('task', TaskSchema);