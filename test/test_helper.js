import mongoose from 'mongoose'

export default (() => {
  before((done) => {
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.connect('mongodb://localhost/test', done)
  })
})()
