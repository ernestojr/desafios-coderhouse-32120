const express = require('express')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
}

const frase = 'Hola mundo cómo están'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function esNumero(value) {
  return !isNaN(parseInt(value))
}

function enRango(pos, length) {
  return pos >= 1 && pos <= length
}

function esInvalido(pos, length) {
  if (!esNumero(pos)) {
    return { error: 'El parámetro no es un número' }
  }

  if (!enRango(parseInt(pos), length)) {
    return { error: 'El parámetro está fuera de rango' }
  }
  
}

app.get('/api/frase', (req, res) => {
  res.status(STATUS_CODE.OK).send(frase)
})

app.get('/api/letras/:pos', (req, res) => {
  let pos = req.params.pos
  const resultado = esInvalido(pos, frase.length)
  if (resultado) {
    res.status(STATUS_CODE.BAD_REQUEST).json(resultado)
    return
  }
  pos = parseInt(pos)
  res.status(STATUS_CODE.OK).send(frase[pos - 1])
})

app.get('/api/palabras/:pos', (req, res) => {
  let pos = req.params.pos
  const palabras = frase.split(' ')
  const resultado = esInvalido(pos, palabras.length)
  if (resultado) {
    res.status(STATUS_CODE.BAD_REQUEST).json(resultado)
    return
  }
  pos = parseInt(pos)
  res.status(STATUS_CODE.OK).send(palabras[pos - 1])
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
