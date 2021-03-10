import candidateService from '../services/candidate_service.js'
import auth from '../authentication.js'
import { Router } from 'express'

function candidateController() {
  const service = candidateService
  const router = Router()

  router.get('/candidates', auth.required(), async (req, res) => {
    return res.status(200).send(await service.getAll(req.query))
  })

  router.post('/candidates', async (req, res) => {
    console.log('body: ' + req.body)
    let serviceRes = await service.insert(req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.put('/candidates/:id', auth.required(), async (req, res) => {
    const { id } = req.params
    let serviceRes = await service.update(id, req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.delete('/candidates/:id', auth.required(), async (req, res) => {
    const { id } = req.params
    let serviceRes = await service.delete(id)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  return router
}

export default candidateController
