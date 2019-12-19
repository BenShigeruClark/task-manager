require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5df334b2e78b6d0bd6d71d09', { completed: true }).then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: true })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})  