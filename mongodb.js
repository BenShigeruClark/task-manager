// CRUD create, read, update, delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connct to database!')
    }
    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID("5ded74be1498d610be2b4a97") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

  //   db.collection('users').find({ age: 77 }).toArray((error, users) => {
  //       console.log(users)
  //   })

  //   db.collection('users').find({ age: 77 }).count((error, count) => {
  //     console.log(count)
  // })

    db.collection('tasks').findOne({ _id: new ObjectID("5ded6d7f1319470f6602e842") }, (error, tasks) => {
        console.log(tasks)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })
})
