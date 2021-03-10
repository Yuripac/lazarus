import AdoptionModel from '../models/candidate_model.js'
import Service from './service.js'

class CandidateService extends Service {
  constructor(model) {
    super(model)
  }
}

export default new CandidateService(new AdoptionModel().getInstance())
