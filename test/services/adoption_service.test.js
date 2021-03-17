import '../test_helper.js'
import service from '../../src/services/adoption_service.js'
import mongoose from 'mongoose'
import { expect } from 'chai'

describe('AdoptionService', () => {
  beforeEach(() => {
    // Creates 15 fake adoptions
    Array(15)
      .fill()
      .forEach(() => {
        service.model.collection.insert({})
      })
  })

  describe('#getAll', () => {
    it('should get adoptions with the default pagination', async () => {
      let { error, statusCode, data, total } = await service.getAll({})

      expect(error).to.be.false
      expect(statusCode).to.equal(200)
      expect(data.length).to.equal(10)
      expect(total).to.equal(15)
    })

    it('should get adoptions with a different pagination', async () => {
      let { error, statusCode, data, total } = await service.getAll({
        limit: 5,
      })

      expect(error).to.be.false
      expect(statusCode).to.equal(200)
      expect(data.length).to.equal(5)
      expect(total).to.equal(15)
    })
  })

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

    describe('#delete', () => {
      it('should delete a adoption', async () => {
        let expectedTotal = (await service.model.count()) - 1

        let adoption = await service.model.findOne()
        const { error, deleted, statusCode, item } = await service.delete(
          adoption._id
        )

        expect(await service.model.count()).to.equal(expectedTotal)
        expect(error).to.be.false
        expect(statusCode).to.equal(302)
        expect(item._id.equals(adoption._id)).to.be.true
      })

      it('should return a missing code response when the id does not exists', async () => {
        const notFoundId = mongoose.Types.ObjectId()
        const { error, statusCode, message } = await service.delete(notFoundId)

        expect(error).to.be.true
        expect(statusCode).to.equal(404)
        expect(message).to.equal('Item not found')
      })
    })
  })
})
