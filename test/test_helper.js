import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
const mongoServer = new MongoMemoryServer()

export default (() => {
  before((done) => {
    mongoServer.getUri().then((uri) => {
      const opts = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
      mongoose.connect(uri, opts, done)
    })
  })

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(done)
  })
})()
