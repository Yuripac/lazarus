import Controller from './controller.js'
import adoptionService from '../services/adoption_service.js'

class AdoptionController extends Controller {
  constructor(service) {
    super(service)
  }
}

export default new AdoptionController(adoptionService)
