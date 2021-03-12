import '../test_helper.js'
import AdoptionModel from '../../src/models/adoption_model.js'
import { expect } from 'chai'

const model = new AdoptionModel().getInstance()

describe('AdoptionModel', () => {
  describe('#getIntance', () => {
    it('should return a instance of the model adoptions', () => {
      expect(model.modelName).to.equal('adoptions')
    })
  })

  describe('#create', () => {
    it('should create a adoption when all data are valid', () => {
      const data = {
        animalName: 'some name here',
        description: 'some description here',
        male: false,
        vaccinations: {
          rabies: true,
        },
      }

      model.create(data, (err, adoption) => {
        expect(err).to.be.null
        expect(adoption).to.not.be.null
      })
    })

    it("shouldn't create a adoption when the attributes are invalid", () => {
      const data = {
        animalName: '',
        vaccinations: {
          what: 'none',
        },
      }

      model.create(data, ({ errors }, _) => {
        const attrsRequired = [
          'animalName',
          'description',
          'male',
          'vaccinations.rabies',
        ]

        attrsRequired.forEach((attr) => {
          expect(errors[attr].properties.type).to.equal('required')
        })
      })
    })
  })
})
