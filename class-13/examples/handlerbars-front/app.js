import express from 'express'
import http from 'http'
import { fileURLToPath } from 'url'
import path from 'path'

import indexRouters from './routers/index.js'

const app = express()

const PORT = process.env.NODE_PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/', indexRouters)

const service = http.createServer(app)

service.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})

export default service
