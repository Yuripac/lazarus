import adoptionService from '../services/adoption_service.js'
import auth from '../authentication.js'
import { Router } from 'express'

function adoptionController() {
  const service = adoptionService
  const router = Router()

  router.get('/adoptions', async (req, res) => {
    return res.status(200).send(await service.getAll(req.query))
  })

  router.post('/adoptions', auth.required(), async (req, res) => {
    console.log('body: ' + req.body)
    let serviceRes = await service.insert(req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.put('/adoptions/:id', async (req, res) => {
    const { id } = req.params
    let serviceRes = await service.update(id, req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.delete('/adoptions/:id', auth.required(), async (req, res) => {
    const { id } = req.params
    let serviceRes = await service.delete(id)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  return router
}

export default adoptionController
