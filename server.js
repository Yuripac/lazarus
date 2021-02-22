import './database.js'
import setRoutes from './routes.js'
import express from 'express'
import bodyParser from 'body-parser'

const server = express()
const port = 3000

setRoutes(server)
server.use(bodyParser.json())
server.listen(port, () => console.log("Server started..."))

export default server