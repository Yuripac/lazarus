import mongoose from 'mongoose'
const { Schema } = mongoose
import uniqueValidator from 'mongoose-unique-validator'
import PasswordEncryptor from '../user/password_encryptor.js'

class UserModel {
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: 'String',
          required: true,
        },
        email: {
          type: 'String',
          required: true,
        },
        salt: {
          type: 'String',
          required: true,
        },
        password: {
          type: 'String',
          required: true,
        },
      },
      { timestamp: true }
    )

    schema.methods.setPassword = this.setPassword
    schema.methods.validatePassword = this.validatePassword

    // Encrypt and set password on user creation
    schema.pre('validate', function () {
      if (this.isNew) {
        this.setPassword(this.password)
      }
    })

    schema.plugin(uniqueValidator)
    mongoose.model('users', schema)
  }

  getInstance() {
    this.initSchema()
    return mongoose.model('users')
  }

  setPassword(password) {
    const encryptor = new PasswordEncryptor()
    this.salt = encryptor.salt()
    this.password = encryptor.encrypt(password, this.salt)
  }

  validatePassword(password) {
    const encryptor = new PasswordEncryptor()
    const hash = encryptor.encrypt(password, this.salt)
    return this.password === hash
  }
}

export default UserModel
