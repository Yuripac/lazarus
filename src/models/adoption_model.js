import mongoose from 'mongoose'
const { Schema } = mongoose
import uniqueValidator from 'mongoose-unique-validator'

class AdoptionModel {
  initSchema() {
    const schema = new Schema(
      {
        animalName: {
          type: 'String',
          required: true,
        },
        description: {
          type: 'String',
          required: true,
        },
        male: {
          type: 'Boolean',
          required: true,
        },
        age: {
          type: 'Number',
        },
        vaccinations: {
          rabies: {
            type: 'Boolean',
            required: true,
          },
        },
        images: [
          {
            url: {
              type: 'String',
              required: true,
            },
          },
        ],
      },
      { timestamps: true }
    )

    schema.plugin(uniqueValidator)
    mongoose.model('adoptions', schema)
  }

  getInstance() {
    this.initSchema()
    return mongoose.model('adoptions')
  }
}

export default AdoptionModel
