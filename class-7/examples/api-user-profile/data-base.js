const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongodbURI = process.env.MONGODB_URI

const client = new MongoClient(mongodbURI)

const database = client.db('perfiles-usuario');

// ***************** Usuarios ***************** 

const usuarios = database.collection('usuarios');

function crear(data) {
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
    throw new Error(`usuario con id ${idUsuario} no encontrado.`)
  }
  return usuario
}

async function actualizarPorId(idUsuario, data) {
  const usuario = await obtenerPorId(idUsuario)
  usuario.nombre = data.nombre || usuario.nombre
  usuario.telefono = data.telefono || usuario.telefono
  usuario.correo = data.correo || usuario.correo
  usuario.estado = data.estado || usuario.estado
  return usuarios.updateOne({ _id: usuario._id }, { $set: usuario })
}

async function borrarPorId(idUsuario, data) {
  const usuario = await await obtenerPorId(idUsuario)
  return usuarios.deleteOne({ _id: usuario._id })
}

exports.usuarios = {
  crear,
  obtener,
  obtenerPorId,
  actualizarPorId,
  borrarPorId,
}