import mongoose from 'mongoose'
import EstudianteModel from './models/estudiante.js'

const estudiantes = [
  { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
  { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
  { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
  { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
  { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
  { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
  { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
  { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
  { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
  { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 },
]

async function connect() {
  try {
    const URL = 'mongodb://localhost:27017/colegio'
    await mongoose.connect(URL)
    console.log('Base de datos conectada')
  } catch (error) {
    console.error('Problema al intentar conectar a la base de datos', error.message)
  }
}

async function crearEstudiante(data) {
  try {
    const user = EstudianteModel(data)
    const result = await user.save()
    console.log('[crearEstudiante] result', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.log('[crearEstudiante] Ah courrido un error', error)
  }
}

async function obtEstudiantes() {
  try {
    const result = await EstudianteModel.find({}, { _id: 0, __v: 0 })
    console.log('[obtEstudiantes] result', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('[obtEstudiantes] Ah courrido un error', error)
  }
}

async function actualizarEstudiante(id, data) {
  try {
    const result = await EstudianteModel.updateOne({ _id: id }, { $set: data })
    console.log('[actualizarEstudiante] result', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('[actualizarEstudiante] Ah courrido un error', error)
  }
}

async function borrarEstudiante(id) {
  try {
    const result = await EstudianteModel.deleteOne({ _id: id })
    console.log('[borrarEstudiante] result', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('[borrarEstudiante] Ah courrido un error', error)
  }
}

await connect()

const promises = estudiantes.map((data) => crearEstudiante(data))

await Promise.all(promises)

await obtEstudiantes()
