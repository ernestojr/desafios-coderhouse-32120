import { v4 as uuid4 } from 'uuid'

const persons = [{
  id: uuid4(),
  name: 'Ernesto',
  lastname: 'Rojas',
  dni: '12345566'
}]

export function create(data) {
  const newPerson = { id: uuid4(), ...data }
  persons.push(newPerson)
  return newPerson
}
export function get() {
  return persons
}

export default {
  get,
  create,
}