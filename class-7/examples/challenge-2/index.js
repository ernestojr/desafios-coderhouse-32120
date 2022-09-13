const express = require('express')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 404,
}

const frase = 'Hola mundo cómo están'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/api/sumar/:a/:b', (req, res) => {
  const a = req.params.a
  const b = req.params.b
  res.status(STATUS_CODE.OK).send(`${a} + ${b} = ${a + b} (params)`)
})

app.post('/api/sumar', (req, res) => {
  const a = req.query.a
  const b = req.query.b
  res.status(STATUS_CODE.OK).send(`${a} + ${b} = ${a + b} (query)`)
})

app.post('/api/operacion/:expresion', (req, res) => {
  const expresion = req.params.expresion.split('+')
  const a = expresion[0]
  const b = expresion[1]
  res.status(STATUS_CODE.OK).send(`${a} + ${b} = ${a + b} (expresion)`)
})

app.get('/api/verbo', (req, res) => {
  res.status(STATUS_CODE.OK).send('OK + GET')
})

app.post('/api/verbo', (req, res) => {
  res.status(STATUS_CODE.OK).send('OK + POST')
})

app.put('/api/verbo', (req, res) => {
  res.status(STATUS_CODE.OK).send('OK + PUT')
})

app.delete('/api/verbo', (req, res) => {
  res.status(STATUS_CODE.OK).send('OK + DELETE')
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
