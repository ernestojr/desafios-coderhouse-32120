import { faker } from '@faker-js/faker/locale/es'
import fs from 'fs'

const { name, internet, random } = faker

let data = 'Nombre;Apellido;Correo;Trabajo;Lugar\n'

for (let index = 0; index < 100; index++) {
  data += `${name.firstName()};${name.lastName()};${internet.email()};${name.jobTitle()};${random.locale()}\n`
}

try {
  fs.promises.writeFile('./test.csv', data)
} catch (error) {
  console.log('Ocurrio un error:', error.message)
}
