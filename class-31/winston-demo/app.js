import express from 'express'
import http from 'http'

import logger from './logger.js'

const app = express()

const PORT = process.env.NODE_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/suma', (req, res) => {
  const { query: { a, b } } = req
  const aInt = parseInt(a, 10)
  const bInt = parseInt(b, 10)

  if (isNaN(aInt)) {
    const msg = 'el valor de campo a es invalido'
    logger.error(msg)
    return res.status(400).send(msg)
  }

  if (isNaN(bInt)) {
    const msg = 'el valor de campo b es invalido'
    logger.error(msg)
    return res.status(400).send(msg)
  }

  const result = aInt + bInt
  const msg = `El resultado de la suma es ${result}`
  logger.info(msg)
  res.send(msg)
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})

function saludo(max = 1000) {
  const text = 'Hola que tal\n'
  return text.repeat(max)
}