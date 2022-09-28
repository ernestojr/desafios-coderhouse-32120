const express = require('express')
const http = require('http')
const path = require('path')

const Socket = require('./socket')

const indexRouter = require('./routers/index')

const PORT = process.env.NODE_PORT || 3000

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

const server = http.createServer(app)

Socket.init(server)

server.on('error', (error) => {
  console.error('Ocurrio un error en el servidor:', JSON.stringify(error))
  process.exit(1)
})

server.listen(PORT, function () {
  console.log(`Service listening http://localhost:${this.address().port}`)
})