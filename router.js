import adoptionController from './src/controllers/adoption_controller.js'
import userController from './src/controllers/user_controller.js'

export default () => {
  return [adoptionController(), userController()]
}
