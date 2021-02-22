import adoptionController from './src/controllers/adoption_controller.js'

export default (server) => {
  // Index
  server.get('/api/adoptions', adoptionController.getAll)
  // Insert
  server.post('/api/adoptions', adoptionController.insert)
}
