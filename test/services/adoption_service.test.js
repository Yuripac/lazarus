import '../test_helper.js'
import serviceSharedTests from './shared.js'
import service from '../../src/services/adoption_service.js'
import mongoose from 'mongoose'
import { expect } from 'chai'

describe('AdoptionService', () => {
  serviceSharedTests(service)

  describe('#insert', () => {
    it('should insert a new adoption and return a success response', async () => {
      const expectedAnimalName = 'somename'
      const data = {
        animalName: expectedAnimalName,
        description: 'some',
        male: false,
        age: 10,
        vaccinations: {
          rabies: true,
        },
      }

      const expectedTotal = (await service.model.count({})) + 1
      let { error, statusCode, item } = await service.insert(data)

      expect(await service.model.count()).to.equal(expectedTotal)
      expect(error).to.be.false
      expect(statusCode).to.equal(201)
      expect(item.animalName).to.equal(expectedAnimalName)
    })

    it('should not insert a new adoption and return a failed response when required attributes missing', async () => {
      const data = {
        animalName: 'invalid adoption',
      }

      const expectedTotal = await service.model.count({})
      let { error, statusCode, item, errors } = await service.insert(data)

      expect(await service.model.count()).to.equal(expectedTotal)
      expect(error).to.be.true
      expect(statusCode).to.equal(400)
      expect(item).to.not.exist
      expect(errors.description).to.not.be.empty
    })
  })

  describe('#update', () => {
    it('should update the adoption when attributes are valid', async () => {
      const adoption = await service.model.findOne()
      const expectedName = 'new adoption name'
      const data = {
        animalName: expectedName,
      }

      const { error, statusCode, item } = await service.update(
        adoption._id,
        data
      )

      expect(error).to.be.false
      expect(statusCode).to.equal(202)
      expect(item.animalName).to.equal(expectedName)
    })

    it('should return a missing code response when the id does not exists', async () => {
      const notFoundId = mongoose.Types.ObjectId()
      const data = {
        animalName: 'new adoption name',
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
      let adoption = await service.model.findOne()
      const data = {
        animalName: '',
      }

      const { error, statusCode, errors } = await service.update(
        adoption._id,
        data
      )

      expect(error).to.be.true
      expect(statusCode).to.equal(400)
      expect(errors.animalName).to.not.be.empty
    })
  })
})
