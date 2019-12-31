const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('503 Server is not available.  Try again in a few minutes!')
// })

app.use(express.json())
app.use(userRouter, taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e0ae740954ff6d46efc4382')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5e0ae612841cccd2e3997718')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()