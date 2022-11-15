import express from 'express'
import expressSession from 'express-session'
import http from 'http'

import apiRouter from './routers/api.js'

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({
  secret: '3!$H4s5K36#s',
  resave: true,
  saveUninitialized: true,
}))

app.use('/api', apiRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in http://localhost:3000/')
})