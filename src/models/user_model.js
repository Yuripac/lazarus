import Model from './model.js'
import mongoose from 'mongoose'
const { Schema } = mongoose
import uniqueValidator from 'mongoose-unique-validator'
import PasswordEncryptor from '../user/password_encryptor.js'
import jwt from 'jsonwebtoken'

class UserModel extends Model {
  constructor() {
    super('users')
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
        salt: {
          type: 'String',
          required: true,
        },
        password: {
          type: 'String',
          required: true,
        },
        admin: {
          type: 'Boolean',
          default: false,
        },
      },
      { timestamp: true }
    )

    // Set Schema methods
    schema.methods.setPassword = this.setPassword
    schema.methods.validPassword = this.validPassword
    schema.methods.generateJWT = this.generateJWT
    schema.methods.toAuthJSON = this.toAuthJSON

    // Encrypt and set password on user creation
    schema.pre('validate', function () {
      if (this.isNew) this.setPassword(this.password)
    })

    schema.plugin(uniqueValidator)
    // Prevent model overwriting
    try {
      mongoose.model('users', schema)
    } catch (err) {}
  }

  generateJWT() {
    const today = new Date()
    const expirationDate = today
    const daysToExpire = 60
    expirationDate.setDate(today.getDate() + daysToExpire)

    return jwt.sign(
      {
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      process.env.JWT_SECRET
    )
  }

  toAuthJSON() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
    }
  }

  setPassword(password) {
    const encryptor = new PasswordEncryptor()
    this.salt = encryptor.salt()
    this.password = encryptor.encrypt(password, this.salt)
  }

  validPassword(password) {
    const encryptor = new PasswordEncryptor()
    const hash = encryptor.encrypt(password, this.salt)
    return this.password === hash
  }
}

export default UserModel
