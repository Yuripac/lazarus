import './database.js'
import router from './router.js'
import express from 'express'
import bodyParser from 'body-parser'

const server = express()
const port = 3000

server.use(bodyParser.json())

server.use('/api', router())

server.listen(port, () => console.log('Server started...'))

export default server
