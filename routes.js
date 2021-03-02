import adoptionController from './src/controllers/adoption_controller.js'

export default (server) => {
  // Index
  server.get('/api/adoptions', adoptionController.getAll)
  // Insert
  server.post('/api/adoptions', adoptionController.insert)
  // Update
  server.put("/api/adoptions/:id", adoptionController.update)
  // Delete
  server.delete("/api/adoptions/:id", adoptionController.delete)
}
