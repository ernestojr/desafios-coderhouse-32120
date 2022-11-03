import { schema, normalize, denormalize } from 'normalizr'
import util from 'util'
import fs from 'fs'

const company = JSON.parse(fs.readFileSync('./company.json'))

function print(object) {
  console.log(util.inspect(object, false, 14, true));
}

const employeeSchema = new schema.Entity('employees')

const companySchema = new schema.Entity('companies', {
  gerente: employeeSchema,
  encargado: employeeSchema,
  empleados: [employeeSchema]
})

console.log('--------------------------------------------------------------------');

console.log('Data Original', JSON.stringify(company).length)

print(company)

console.log('--------------------------------------------------------------------');

const dataNormalized = normalize(company, companySchema)

console.log('Data Normalized', JSON.stringify(dataNormalized).length)

print(dataNormalized)

console.log('--------------------------------------------------------------------');

const dataReversed = denormalize(dataNormalized.result, companySchema, dataNormalized.entities)

console.log('Data Reversed', JSON.stringify(dataReversed).length)

print(dataReversed)
