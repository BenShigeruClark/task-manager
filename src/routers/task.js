const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

  try {
      await task.save()
      res.status(201).send(task)
  } catch (e) {
      res.status(400).send(e)
  }
})

// GET /tasks?completed=false Refactor to limit the tasks we get back
router.get('/tasks', auth, async (req, res) => {
  const match = {} 
  const sort = {}
  // will only get back the completed tasks that are of true 
  if (req.query.completed) {
      match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1  //use ternary operator to return data in desc or asc order
  }

  try {
    //   const tasks = await Task.find({ owner: req.user._id })  - is alternative to above, will work in the same manner
      await req.user.populate({
          path: 'tasks',
          match, 
          options: {
              limit: parseInt(req.query.limit), // limiting tasks with pagination ex. GET /tasks?limit=10&skip=10
              skip: parseInt(req.query.skip),
              sort
          }
      }).execPopulate()
      res.send(req.user.tasks)
  } catch (e) {
      res.status(500).send()
  }
})

// fetches a task by id
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })  // finds single task and filter by id and owner value

      if (!task) {
          return res.status(404).send()
      }

      res.send(task)
  } catch (e) {
      res.status(500).send()
  }
})

// updates a task by id
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user._id }) 

      if (!task) {
          return res.status(404).send()
      }

      updates.forEach((update) => task[update] = req.body[update])
      await task.save()
      res.send(task)
  } catch (e) {
          res.status(400).send()
  }
})

// finds and deletes the task by _id/owner 
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    //   const task = await Task.findByIdAndDelete(req.params.id)

      if (!task) {
          return res.status(404).send()
      }

      res.send(task)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router