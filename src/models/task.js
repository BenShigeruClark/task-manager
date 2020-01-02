const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
  }, {
      timestamps: true // create timestamps when creating a new task, use for sorting or filtering in app
  })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task