import UserModel from '../models/user_model.js'
import Service from './service.js'

class UserService extends Service {
  constructor(model) {
    super(model)
  }

  // Update only permitted attrubytes (not password or email)
  async update(id, data) {
    return await super.update(id, this.permittedUpdateParams(data))
  }

  // Get permitted attributes for normal update
  permittedUpdateParams(data) {
    const permittedParams = ['name']
    let filteredData = {}
    permittedParams.forEach((elem) => (filteredData[elem] = data[elem]))
    return filteredData
  }
}

export default new UserService(new UserModel().getInstance())
