import express from 'express'
import http from 'http'

import router from './routers/index.js'
import { init } from './db/mongodb.js'

await init()

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in http://localhost:3000/')
})