import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongoDB.URI)

class ContenedorMongoDB {
  constructor(modelName, schema) {
      this.collection = mongoose.model(modelName, schema)
  }

  listar(id) {
    throw new Error('No implementado')
  }

  async listarAll() {
    return this.collection.find({})
  }

  async guardar(obj) {
    const result = await this.collection.create(obj)
    return result
  }

  async actualizar(elem) {
    throw new Error('No implementado')
  }

  async borrar(id) {
    throw new Error('No implementado')
  }

  async borrarAll() {
    throw new Error('No implementado')
  }
}

export default ContenedorMongoDB