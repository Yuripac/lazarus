import Controller from './controller.js'
import userService from '../services/user_service.js'

class UserController extends Controller {
  constructor(service) {
    super(service)
  }

  async login(req, res) {
    return res.status(200).send({ user: req.user.toAuthJSON() })
  }
}

export default new UserController(userService)
