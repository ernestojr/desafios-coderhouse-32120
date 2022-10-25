import mongoose, { Schema } from 'mongoose'

const user = new Schema({
  nombre: { type: String, require: true },
  apellido: { type: String, require: true },
  edad: { type: Number, require: true },
  telefono: { type: String, require: true },
  correo: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
  estado: { type: String, default: 'active', enum: ['active', 'inactive'] },
  create_time: { type: Date, default: Date.now },
})

export default mongoose.model('User', user)
