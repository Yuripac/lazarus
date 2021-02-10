// import allControllers
export default (server) => {
  server.get('/api/hello_world', (req, res) => res.json({ message: 'HELLO WORLD!' }))
}
