import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import http from 'http'
import path from 'path'
import hbs from 'hbs'
import url from 'url'

import apiRouter from './routers/api.js'
import viewRouter from './routers/view.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('3!$H4s5K36#s'))
app.use(expressSession({
  secret: '3!$H4s5K36#s',
  resave: true,
  saveUninitialized: true,
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', hbs.__express)

app.use('/', viewRouter)
app.use('/api', apiRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in http://localhost:3000/')
})