import mongoose from 'mongoose'
import UserModel from './models/user.js'

async function connect() {
  try {
    const URL = 'mongodb://localhost:27017/ecommerce'
    await mongoose.connect(URL)
    console.log('Base de datos conectada')
  } catch (error) {
    console.error('Problema al intentar conectar a la base de datos', error.message)
  }
}

async function createUser(data) {
  try {
    const user = UserModel(data)
    const result = await user.save()
    console.log('[createUser] result', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.log('[createUser] Ah courrido un error', error)
  }
}

async function getAllUsers() {
  try {
    const result = await UserModel.find({}, { _id: 0, __v: 0 })
    console.log('[getAllUsers] result', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('[getAllUsers] Ah courrido un error', error)
  }
}

async function updateUsers(id, data) {
  try {
    const result = await UserModel.updateOne({ _id: id }, { $set: data })
    console.log('[updateUsers] result', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('[updateUsers] Ah courrido un error', error)
  }
}

async function deleteUsers(id) {
  try {
    const result = await UserModel.deleteOne({ _id: id })
    console.log('[deleteUsers] result', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('[deleteUsers] Ah courrido un error', error)
  }
}

await connect()

const result = await createUser({
  nombre: 'Ikram',
  apellido: 'Segui',
  edad: 38,
  telefono: '56900000008',
  correo: 'ikram_segui@correo.com',
})

console.log('result', JSON.stringify(result));

const id = result._id

await getAllUsers()
await updateUsers(id, { edad: 39, telefono: '56900000009' })
await getAllUsers()
await deleteUsers(id)
await getAllUsers()
