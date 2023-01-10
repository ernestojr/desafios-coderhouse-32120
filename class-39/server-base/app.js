import express from 'express'
import http from 'http'
import { engine } from 'express-handlebars'

import routers from './routers/index.js'

const app = express()

const PORT = process.env.NODE_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', routers)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})