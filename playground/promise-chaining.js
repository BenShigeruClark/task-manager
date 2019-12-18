require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5df8746b9daba22822e10a10', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})