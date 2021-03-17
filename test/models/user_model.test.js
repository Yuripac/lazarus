import '../test_helper.js'
import PasswordEncryptor from '../../src/user/password_encryptor.js'
import UserModel from '../../src/models/user_model.js'
import { expect } from 'chai'

const model = new UserModel().getInstance()
const userPassword = 'password123'
const validData = {
  name: 'some name here',
  email: 'bla@gmail.com',
  password: userPassword,
}
describe('UserModel', () => {
  describe('#getIntance', () => {
    it('should return a instance of the model users', () => {
      expect(model.modelName).to.equal('users')
    })
  })

  describe('#create', () => {
    it('should create a user and encrypt the password when all the attributes are valid', () => {
      model.create(validData, (err, user) => {
        expect(err).to.be.null
        expect(user).to.not.be.null

        const encryptor = new PasswordEncryptor()
        const expectedPassword = encryptor.encrypt(userPassword, user.salt)
        expect(user.password).to.equal(expectedPassword)
      })
    })

    it("shouldn't create when the required attributes are missing", () => {
      const data = {
        name: '',
      }

      model.create(data, ({ errors }, _) => {
        const attrsRequired = ['name', 'email', 'salt', 'password']

        attrsRequired.forEach((attr) => {
          expect(errors[attr].properties.type).to.equal('required')
        })
      })
    })

    it("shouldn't create when the email have a wrong format", () => {
      validData.email = 'invalidemail'

      model.create(validData, ({ errors }, _) => {
        expect(errors.email.properties.type).to.equal('regexp')
      })
    })
  })
})
