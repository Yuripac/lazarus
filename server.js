import './database.js'
import setRoutes from './routes.js'
import express from 'express'

const server = express()
const port = 3000

setRoutes(server)
server.listen(port, () => console.log("Server started..."))

export default server