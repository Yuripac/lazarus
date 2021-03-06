import '../test_helper.js'
import service from '../../src/services/user_service.js'
import serviceSharedTests from './shared.js'
import mongoose from 'mongoose'
import { expect } from 'chai'

describe('UserService', () => {
  serviceSharedTests(service)

  describe('#insert', () => {
    it('should insert a new document and return a success response', async () => {
      const expectedName = 'random name'
      const data = {
        name: expectedName,
        email: 'random@gmail.com',
        password: 'randompassword',
      }

      const expectedTotal = (await service.model.count({})) + 1
      let { error, statusCode, item } = await service.insert(data)

      expect(await service.model.count()).to.equal(expectedTotal)
      expect(error).to.be.false
      expect(statusCode).to.equal(201)
      expect(item.name).to.equal(expectedName)
    })

    it('should not insert a new document and return a failed response when required attributes missing', async () => {
      const data = {
        name: 'invalid user',
      }

      const expectedTotal = await service.model.count({})
      let { error, statusCode, item, errors } = await service.insert(data)

      expect(await service.model.count()).to.equal(expectedTotal)
      expect(error).to.be.true
      expect(statusCode).to.equal(400)
      expect(item).to.not.exist
      expect(errors.email).to.not.be.empty
    })
  })

  describe('#update', () => {
    it('should not update the email or password', async () => {
      const initData = {
        name: 'random name',
        email: 'random@gmail.com',
        password: 'randompassword',
      }
      // Create a new user first
      const user = (await service.insert(initData)).item
      const expectedName = 'another name'

      const { error, statusCode, item } = await service.update(user._id, {
        name: expectedName,
        email: 'anotheremail@gmail.com',
        password: 'anotherpassword',
      })

      expect(error).to.be.false
      expect(statusCode).to.equal(202)
      expect(item.name).to.equal(expectedName)
      expect(item.email).to.equal(initData.email)
      expect(item.password).to.equal(user.password)
    })

    it('should return a missing code response when the id does not exists', async () => {
      const notFoundId = mongoose.Types.ObjectId()
      const data = {
        name: 'new name',
      }
      const { error, statusCode, message } = await service.update(
        notFoundId,
        data
      )

      expect(error).to.be.true
      expect(statusCode).to.equal(404)
      expect(message).to.equal('Item not found')
    })

    it('should not update and return a failed response when a the attributes are not valid', async () => {
      let user = await service.model.findOne()
      const data = {
        name: '',
      }

      const { error, statusCode, errors } = await service.update(user._id, data)

      expect(error).to.be.true
      expect(statusCode).to.equal(400)
      expect(errors.name).to.not.be.empty
    })
  })
})
