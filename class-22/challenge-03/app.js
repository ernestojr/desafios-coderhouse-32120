import { schema, normalize, denormalize } from 'normalizr'
import util from 'util'
import fs from 'fs'

const holding = JSON.parse(fs.readFileSync('./holding.json'))

function print(object) {
  console.log(util.inspect(object, false, 14, true));
}

const employeeSchema = new schema.Entity('employees')

const companySchema = new schema.Entity('companies', {
  gerente: employeeSchema,
  encargado: employeeSchema,
  empleados: [employeeSchema]
})

const holdingSchema = new schema.Entity('grupos', {
  empresas: [companySchema]
})

const originalSize = JSON.stringify(holding).length

console.log('--------------------------------------------------------------------');

console.log('Data Original', originalSize)

print(holding)

console.log('--------------------------------------------------------------------');

const dataNormalized = normalize(holding, holdingSchema)

const normalizedSize = JSON.stringify(dataNormalized).length

console.log('Data Normalized', normalizedSize)

print(dataNormalized)

console.log('--------------------------------------------------------------------');

const dataReversed = denormalize(dataNormalized.result, holdingSchema, dataNormalized.entities)

console.log('Data Reversed', JSON.stringify(dataReversed).length)

print(dataReversed)

console.log('--------------------------------------------------------------------');

const result = (normalizedSize * 100) / originalSize

console.log('Porcentage de compresion:', result.toFixed(2), '%')


