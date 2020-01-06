const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000 // this object uses key value of limits to limit up to 1mb file size
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document')) // If file is not a word document then this callback error will run
        }

        cb(undefined, true)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})



app.use(express.json())
app.use(userRouter, taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

