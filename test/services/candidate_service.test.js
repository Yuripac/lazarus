import '../test_helper.js'
import serviceSharedTests from './shared.js'
import service from '../../src/services/candidate_service.js'
import mongoose from 'mongoose'
import { expect } from 'chai'

describe('CandidateService', () => {
  serviceSharedTests(service)

  describe('#insert', () => {
    it('should insert a new candidate and return a success response', async () => {
      const expectedName = 'somename'
      const data = {
        name: expectedName,
        email: 'bla@gmail.com',
        phone: '999999999',
        adoption: {
          _id: mongoose.Types.ObjectId(),
        },
      }

      const expectedTotal = (await service.model.count({})) + 1
      let { error, statusCode, item } = await service.insert(data)

      expect(await service.model.count()).to.equal(expectedTotal)
      expect(error).to.be.false
      expect(statusCode).to.equal(201)
      expect(item.name).to.equal(expectedName)
    })

    it('should not insert a new candidate and return a failed response when required attributes missing', async () => {
      const data = {
        name: 'invalid candidate',
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
    it('should update the candidate when attributes are valid', async () => {
      const candidate = await service.model.findOne()
      const expectedName = 'new candidate name'
      const data = {
        name: expectedName,
      }

      const { error, statusCode, item } = await service.update(
        candidate._id,
        data
      )

      expect(error).to.be.false
      expect(statusCode).to.equal(202)
      expect(item.name).to.equal(expectedName)
    })

    it('should return a missing code response when the id does not exists', async () => {
      const notFoundId = mongoose.Types.ObjectId()
      const data = {
        name: 'new candidate name',
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
      let candidate = await service.model.findOne()
      const data = {
        name: '',
      }

      const { error, statusCode, errors } = await service.update(
        candidate._id,
        data
      )

      expect(error).to.be.true
      expect(statusCode).to.equal(400)
      expect(errors.name).to.not.be.empty
    })
  })
})
