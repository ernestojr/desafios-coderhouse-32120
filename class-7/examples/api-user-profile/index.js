const express = require('express')
const BD = require('./data-base')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/usuarios', async (req, res) => {
  const query = req.query
  const usuarios = await BD.usuarios.obtener(query)
  res.status(STATUS_CODE.OK).json(usuarios)
})

app.get('/usuarios/:id', async (req, res) => {
  const idUsuario = req.params.id
  try {
    const usuario = await BD.usuarios.obtenerPorId(idUsuario)
    res.status(STATUS_CODE.OK).json(usuario)
  } catch (error) {
    console.log(error.message)
    res.status(STATUS_CODE.NOT_FOUND).end()
  }
})

app.post('/usuarios', async (req, res) => {
  const data = req.body
  data.estado = 'activo'
  const result = await BD.usuarios.crear(data)
  const usuario = await BD.usuarios.obtenerPorId(result.insertedId)
  res.status(STATUS_CODE.CREATED).json(usuario)
})

app.put('/usuarios/:id', async (req, res) => {
  const idUsuario = req.params.id
  try {
    await BD.usuarios.actualizarPorId(idUsuario, req.body)
    res.status(STATUS_CODE.NO_CONTENT).end()
  } catch (error) {
    console.log(error.message)
    res.status(STATUS_CODE.NOT_FOUND).end()
  }
})

app.delete('/usuarios/:id', async (req, res) => {
  const idUsuario = req.params.id
  try {
    await BD.usuarios.borrarPorId(idUsuario)
    res.status(STATUS_CODE.NO_CONTENT).end()
  } catch (error) {
    console.log(error.message)
    res.status(STATUS_CODE.NOT_FOUND).end()
  }
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
