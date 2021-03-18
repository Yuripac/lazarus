import '../test_helper.js'
import mongoose from 'mongoose'
import { expect } from 'chai'

export default (service) => {
  beforeEach(() => {
    // Creates 15 fake documents
    Array(15)
      .fill()
      .forEach(() => {
        service.model.collection.insert({})
      })
  })

  describe('#getAll', () => {
    it('should get all with the default pagination', async () => {
      let { error, statusCode, data, total } = await service.getAll({})

      expect(error).to.be.false
      expect(statusCode).to.equal(200)
      expect(data.length).to.equal(10)
      expect(total).to.equal(15)
    })

    it('should get all with a different pagination', async () => {
      let { error, statusCode, data, total } = await service.getAll({
        limit: 5,
      })

      expect(error).to.be.false
      expect(statusCode).to.equal(200)
      expect(data.length).to.equal(5)
      expect(total).to.equal(15)
    })
  })

  describe('#delete', () => {
    it('should delete', async () => {
      let expectedTotal = (await service.model.count()) - 1

      let document = await service.model.findOne()
      const { error, deleted, statusCode, item } = await service.delete(
        document._id
      )

      expect(await service.model.count()).to.equal(expectedTotal)
      expect(error).to.be.false
      expect(statusCode).to.equal(302)
      expect(item._id.equals(document._id)).to.be.true
    })

    it('should return a missing code response when the id does not exists', async () => {
      const notFoundId = mongoose.Types.ObjectId()
      const { error, statusCode, message } = await service.delete(notFoundId)

      expect(error).to.be.true
      expect(statusCode).to.equal(404)
      expect(message).to.equal('Item not found')
    })
  })
}
