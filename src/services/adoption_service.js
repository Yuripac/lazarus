import AdoptionModel from '../models/adoption_model.js'
import Service from './service.js'

class AdoptionService extends Service {
  constructor(model) {
    super(model)
  }
}

export default new AdoptionService(new AdoptionModel().getInstance())
