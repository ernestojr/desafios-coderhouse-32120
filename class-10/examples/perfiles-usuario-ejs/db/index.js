const ObjectId = require('mongodb').ObjectId
const pick = require('lodash/pick')
const filter = require('lodash/filter')
const find = require('lodash/find')
const remove = require('lodash/remove')
const { NotFoundError } = require('../utils/errores')

const usuarios = [
  {
    _id: '632b30614615e037e885489e',
    nombre: 'María',
    apellido: 'Rojas',
    edad: 21,
    telefono: '56900000001',
    correo: 'mariarojas@mail.com',
    avatar: 'http://localhost:3000/api/usuarios/avatares/a3ee9edd-dc73-4236-b510-a84f83e5538e.jpeg',
    estado: 'activo',
    create_time: new Date(),
    update_time: new Date(),
  },
  {
    _id: '632b30614615e037e885489f',
    nombre: 'Carlos',
    apellido: 'Gómez',
    edad: 21,
    telefono: '56900000002',
    correo: 'carlosgomez@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
  {
    _id: '632b30614615e037e88548a0',
    nombre: 'Adrian',
    apellido: 'López',
    edad: 21,
    telefono: '56900000003',
    correo: 'adrianlopez@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
  {
    _id: '632b30614615e037e88548a1',
    nombre: 'Ana',
    apellido: 'Guerra',
    edad: 21,
    telefono: '56900000004',
    correo: 'anaguerra@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
]

function crear(data) {
  const _id = new ObjectId()
  data.estado = 'activo'
  data.create_time = new Date()
  usuarios.push({ _id, ...data })
  return { insertedId: _id }
}

function obtener(query = {}) {
  const criterio = {}
  if (query.correo) {
    criterio.correo = query.correo
  }
  if (query.telefono) {
    criterio.telefono = query.telefono
  }
  return filter(usuarios, (usuario) => {
    let status = true
    if (query.correo || query.telefono) {
      status = false
    }
    if ((query.correo && query.correo === usuario.correo) || (query.telefono && query.telefono === usuario.telefono)) {
      status = true
    }
    return status
  })
}

function obtenerPorId(idUsuario) {
  const usuario = find(usuarios, usuario => String(usuario._id) === String(idUsuario))
  if (!usuario) {
    throw new NotFoundError(`usuario con id ${idUsuario} no encontrado.`)
  }
  return usuario
}

function actualizarPorId(idUsuario, dataRequest) {
  const usuario = obtenerPorId(idUsuario)
  const fieldTarget = [
    'nombre',
    'apellido',
    'edad',
    'telefono',
    'correo',
    'avatar',
    'estado',
  ]
  const data = {
    ...pick(dataRequest, fieldTarget),
    update_time: new Date()
  }
  return Object.assign(usuario, data)
}

function borrarPorId(idUsuario) {
  const usuario = obtenerPorId(idUsuario)
  remove(usuarios, usuario => String(usuario._id) === String(idUsuario))
  return usuario
}

module.exports = {
  crear,
  obtener,
  obtenerPorId,
  actualizarPorId,
  borrarPorId,
}