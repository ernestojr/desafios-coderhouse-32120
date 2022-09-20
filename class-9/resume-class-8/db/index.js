const mongodb = require('mongodb')
const pick = require('lodash/pick')
const { NotFoundError } = require('../utils/errores')
const MongoClient = mongodb.MongoClient

const mongodbURI = process.env.MONGODB_URI

let usuarios;

(async () => {
  try {
    console.log('Conectando a la base de datos...')
    const client = await MongoClient.connect(mongodbURI)
    const db = client.db('perfiles-usuario')
    console.log('Conectados a la base de datos.')
    usuarios = db.collection('usuarios')
  } catch (error) {
    console.error('Error al intentar conectarse a la base de datos:', error.message)
  }
})();

function crear(data) {
  data.create_time = new Date()
  return usuarios.insertOne(data)
}

async function obtener(query = {}) {
  const criterio = {}
  if (query.correo) {
    criterio.correo = query.correo
  }
  if (query.telefono) {
    criterio.telefono = query.telefono
  }
  const cursor = usuarios.find(criterio)
  const result = []
  await cursor.forEach((usr) => {
    result.push(usr)
  })
  return result
}

async function obtenerPorId(idUsuario) {
  const usuario = await usuarios.findOne({ _id: new mongodb.ObjectId(idUsuario) })
  if (!usuario) {
    throw new NotFoundError(`usuario con id ${idUsuario} no encontrado.`)
  }
  return usuario
}

async function actualizarPorId(idUsuario, dataRequest) {
  const usuario = await obtenerPorId(idUsuario)
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
  return usuarios.updateOne({ _id: usuario._id }, { $set: data })
}

async function borrarPorId(idUsuario, data) {
  const usuario = await await obtenerPorId(idUsuario)
  return usuarios.deleteOne({ _id: usuario._id })
}

module.exports = {
  crear,
  obtener,
  obtenerPorId,
  actualizarPorId,
  borrarPorId,
}