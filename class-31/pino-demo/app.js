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
  const { query } = req
  logger.debug(`query: ${JSON.stringify(query)}`)
  const a = parseInt(query.a, 10)
  const b = parseInt(query.b, 10)
  logger.debug(`a converted: ${a}`)
  logger.debug(`b converted: ${b}`)
  if (isNaN(a)) {
    const msg = 'el valor de campo a es invalido'
    logger.error(msg)
    return res.status(400).send(msg)
  }

  if (isNaN(b)) {
    const msg = 'el valor de campo b es invalido'
    logger.error(msg)
    return res.status(400).send(msg)
  }

  const result = a + b
  const msg = `El resultado de la suma es ${result}`
  logger.info(msg)
  res.send(msg)
})

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running in http://localhost:${PORT}/`)
})

function saludo(max = 1000) {
  const text = 'Hola que tal\n'
  return text.repeat(max)
}