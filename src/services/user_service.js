import UserModel from '../models/user_model.js'
import Service from './service.js'

class UserService extends Service {
  constructor(model) {
    super(model)
    this.updatableAttributes = ['name']
  }
}

export default new UserService(new UserModel().getInstance())
