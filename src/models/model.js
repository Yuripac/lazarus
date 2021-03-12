import mongoose from 'mongoose'

class Model {
  constructor(name) {
    this.modelName = name
  }

  getInstance() {
    try {
      return mongoose.model(this.modelName, this.buildSchema())
    } catch (err) {
      return mongoose.model(this.modelName)
    }
  }
}

export default Model
