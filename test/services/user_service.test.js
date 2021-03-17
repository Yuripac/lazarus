import '../test_helper.js'
import service from '../../src/services/user_service.js'
import { expect } from 'chai'

describe('UserService', () => {
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
  })
})
