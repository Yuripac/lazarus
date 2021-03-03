import Controller from './controller.js'
import userService from '../services/user_service.js'

class UserController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new UserController(userService)
