import adoptionController from './src/controllers/adoption_controller.js'
import userController from './src/controllers/user_controller.js'

export default (server) => {
  // Adoptions1
  // Index
  server.get('/api/adoptions', adoptionController.getAll)
  // Insert
  server.post('/api/adoptions', adoptionController.insert)
  // Update
  server.put('/api/adoptions/:id', adoptionController.update)
  // Delete
  server.delete('/api/adoptions/:id', adoptionController.delete)

  // Users
  // Index
  server.get('/api/users', userController.getAll)
  // Insert
  server.post('/api/users', userController.insert)
  // Update
  server.put('/api/users/:id', userController.update)
}
