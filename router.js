import adoptionController from './src/controllers/adoption_controller.js'
import userController from './src/controllers/user_controller.js'
import Auth from './src/authentication.js'
import { Router } from 'express'

export default () => {
  const router = Router()
  const auth = new Auth()

  // Adoptions
  // Index
  router.get('/adoptions', auth.optional(), adoptionController.getAll)
  // Insert
  router.post('/adoptions', auth.required(), adoptionController.insert)
  // Update
  router.put('/adoptions/:id', auth.required(), adoptionController.update)
  // Delete
  router.delete('/adoptions/:id', auth.optional(), adoptionController.delete)

  // Users
  // Index
  router.get('/users', auth.required(), userController.getAll)
  // Insert
  router.post('/users', auth.required(), userController.insert)
  // Update
  router.put('/users/:id', auth.required(), userController.update)

  // login test
  router.post('/login', auth.authenticate(), userController.login)
  return router
}
