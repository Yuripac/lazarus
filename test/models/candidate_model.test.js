import '../test_helper.js'
import CandidateModel from '../../src/models/candidate_model.js'
import mongoose from 'mongoose'
import { expect } from 'chai'

const model = new CandidateModel().getInstance()
const validData = {
  name: 'some name here',
  email: 'bla@gmail.com',
  phone: '999999999',
  adoption: {
    _id: mongoose.Types.ObjectId(),
  },
}

describe('CandidateModel', () => {
  describe('#getIntance', () => {
    it('should return a instance of the model candidates', () => {
      expect(model.modelName).to.equal('candidates')
    })
  })

  describe('#create', () => {
    it('should create when all the attributes are valid', () => {
      model.create(validData, (err, candidate) => {
        expect(err).to.be.null
        expect(candidate).to.not.be.null
      })
    })

    it("shouldn't create when the required attributes are missing", () => {
      const data = {}

      model.create(data, ({ errors }, _) => {
        const attrsRequired = ['name', 'email', 'phone', 'adoption']

        attrsRequired.forEach((attr) => {
          expect(errors[attr].properties.type).to.equal('required')
        })
      })
    })

    it("shouldn't create when the email have a wrong format", () => {
      validData.email = 'invalidemail'

      model.create(validData, ({ errors }, _) => {
        expect(errors.email.properties.type).to.equal('regexp')
      })
    })

    it("shouldn't create when the phone have a wrong format", () => {
      validData.phone = '9999999'

      model.create(validData, ({ errors }, _) => {
        expect(errors.phone.properties.type).to.equal('regexp')
      })

      validData.phone = 'aaaaaaaa'

      model.create(validData, ({ errors }, _) => {
        expect(errors.phone.properties.type).to.equal('regexp')
      })
    })
  })
})
