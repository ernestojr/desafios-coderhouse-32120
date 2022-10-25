import mongoose, { Schema } from 'mongoose'

const estudiante = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  dni: { type: String, required: true, unique: true },
  curso: { type: String, required: true },
  nota: { type: Number, required: true },
})

export default mongoose.model('Estudiantes', estudiante)