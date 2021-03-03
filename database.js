import mongoose from 'mongoose'

class Connection {
  constructor() {
    const url = 'mongodb://127.0.0.1:27017'
    console.log('Establish new connection with url', url)

    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.connect(url)
  }
}

export default new Connection()
