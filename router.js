import userController from './src/controllers/user_controller.js'
import adoptionController from './src/controllers/adoption_controller.js'
import candidateController from './src/controllers/candidate_controller.js'

export default () => {
  return [adoptionController(), userController(), candidateController()]
}
