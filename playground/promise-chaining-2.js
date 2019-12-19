require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5df334b2e78b6d0bd6d71d09', { completed: true }).then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: true })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })  

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5df33392892c280b687a3fe6').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})