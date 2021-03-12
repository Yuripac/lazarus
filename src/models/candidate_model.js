import Model from './model.js'
import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = Schema
import uniqueValidator from 'mongoose-unique-validator'

class CandidateModel extends Model {
  constructor() {
    super('candidates')
  }

  buildSchema() {
    const schema = new Schema(
      {
        name: {
          type: 'String',
          required: true,
        },
        email: {
          type: 'String',
          required: true,
          match: /\S+@\S+\.\S+/,
        },
        phone: {
          type: 'String',
          required: true,
          match: /^\d{8,}$/,
        },
        adoption: {
          type: ObjectId,
          ref: 'adoptions',
          required: true,
        },
      },
      { timestamps: true }
    )
    schema.index({ email: 1, adoption: 1 }, { unique: true })

    schema.plugin(uniqueValidator)
    mongoose.model('candidates', schema)
  }
}

export default CandidateModel
