const express = require('express')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

const DATA_BASE = {
  usuarios: [
    {
      id: 1,
      nombre: 'Carlos Gómez',
      telefono: '+56900000000',
      correo: 'carlosgomez@mail.com',
      estado: 'activo',
    },
  ],
}

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
}

app.use(express.json())

app.get('/usuarios', (req, res) => {
  res.status(200).json(DATA_BASE.usuarios)
})

app.get('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id
  const find = require('lodash/find')
  const usuario = find(DATA_BASE.usuarios, usuario => usuario.id === Number(idUsuario))
  if (!usuario) {
    console.log(`usuario con id ${idUsuario} no encontrado.`)
    res.status(STATUS_CODE.NOT_FOUND).end()
  } else {
    console.log(`usuario con id ${idUsuario} encontrado.`)
    res.status(STATUS_CODE.OK).json(usuario)
  }
})

app.post('/usuarios', (req, res) => {
  const last = require('lodash/last')
  const data = req.body
  data.id = last(DATA_BASE.usuarios).id + 1
  data.estado = 'activo'
  DATA_BASE.usuarios.push(data)
  res.status(STATUS_CODE.CREATED).json(last(DATA_BASE.usuarios))
})

app.put('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id
  const find = require('lodash/find')
  const usuario = find(DATA_BASE.usuarios, usuario => usuario.id === Number(idUsuario))
  if (!usuario) {
    console.log(`usuario con id ${idUsuario} no encontrado.`)
    res.status(STATUS_CODE.NOT_FOUND).end()
  } else {
    const data = req.body
    usuario.nombre = data.nombre || usuario.nombre
    usuario.telefono = data.telefono || usuario.telefono
    usuario.correo = data.correo || usuario.correo
    usuario.estado = data.estado || usuario.estado
    res.status(STATUS_CODE.NO_CONTENT).end() 
  }
})

app.delete('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id
  const find = require('lodash/find')
  const remove = require('lodash/remove')
  const usuario = find(DATA_BASE.usuarios, usuario => usuario.id === Number(idUsuario))
  if (!usuario) {
    console.log(`usuario con id ${idUsuario} no encontrado.`)
    res.status(STATUS_CODE.NOT_FOUND).end()
  } else {
    remove(DATA_BASE.usuarios, usuario => usuario.id === Number(idUsuario))
    res.status(STATUS_CODE.NO_CONTENT).end()
  }
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
