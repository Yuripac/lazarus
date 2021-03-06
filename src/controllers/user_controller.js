import userService from '../services/user_service.js'
import auth from '../authentication.js'

import { Router } from 'express'

function userController() {
  const service = userService
  const router = Router()

  router.get('/users', auth.required(), async (req, res) => {
    return res.status(200).send(await service.getAll(req.query))
  })

  router.post('/users', auth.required(), async (req, res) => {
    let serviceRes = await service.insert(req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.put('/users/:id', auth.required(), async (req, res) => {
    const { id } = req.params
    let serviceRes = await service.update(id, req.body)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.delete('/users/:id', auth.required(), async (req, res) => {
    const { id } = req.params
    let serviceRes = await service.delete(id)

    return res.status(serviceRes.statusCode).send(serviceRes)
  })

  router.post('/login', auth.authenticate(), async (req, res) => {
    return res.status(200).send({ user: req.user.toAuthJSON() })
  })

  return router
}

export default userController
