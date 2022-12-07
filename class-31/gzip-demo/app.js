import express from 'express'
import http from 'http'
import compression from 'compression'

const app = express()

const PORT = process.env.NODE_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/saludo', (req, res) => {
  res.send(saludo())
})

app.get('/saludozip', compression(), (req, res) => {
  res.send(saludo())
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})

function saludo(max = 1000) {
  const text = 'Hola que tal\n'
  return text.repeat(max)
}