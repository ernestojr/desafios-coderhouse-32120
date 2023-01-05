import { promises } from 'fs'
import { v4 as uuid4 } from 'uuid'

let FILE_NAME

export function init() {
  FILE_NAME = 'data.db'
}

export async function getOperations() {
  const operations = await promises.readFile(FILE_NAME, 'utf-8')
  return JSON.parse(operations)
}

export async function setOperation(data) {
  const newOperation = {
    id: uuid4(),
    ...data,
  }
  const operations = await getOperations()
  operations.push(newOperation)
  await promises.writeFile(FILE_NAME, JSON.stringify(operations, null, 2))
  return newOperation
}

export default {
  init,
  getOperations,
  setOperation,
}
