// CRUD create, read, update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connct to database!')
    }
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Alejandro',
    //     age: 77
    // }, (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //       name: 'Jen',
    //       age: 28
    //     }, {
    //       name: 'Gunther',
    //       age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //   {
    //     description: 'Washed Dishes',
    //     completed: true
    //   }, {
    //     description: 'Band Practice',
    //     completed: false
    //   }, {
    //     description: 'Sold Camera',
    //     completed: true
    //   }
    // ], (error, result) => {
    //   if (error) {
    //     return console.log('Unable to insert tasks!')
    //   }

    //   console.log(result.ops)
    // })
})
