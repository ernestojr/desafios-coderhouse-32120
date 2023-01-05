import mongoose from 'mongoose'


export async function init() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI
    await mongoose.connect(MONGODB_URI)
    console.log('Database connected.')
  } catch (error) {
    console.error('Error to connecto to database', error.message)
  }
}

const OperationModel = mongoose.model('operation', {
  operation: String,
  params: Object,
  result: Number,
  timestamps: Number,
})

export function getOperations() {
  return OperationModel.find()
}

export function setOperation(data) {
  return OperationModel.create(data)
}

export default {
  init,
  getOperations,
  setOperation,
}
