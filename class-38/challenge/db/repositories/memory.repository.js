import { v4 as uuid4 } from 'uuid'

let operations

export function init() {
  operations = []
}

export function getOperations() {
  return operations
}

export function setOperation(data) {
  const newOperation = {
    id: uuid4(),
    ...data,
  }
  operations.push(newOperation)
  return newOperation
}

export default {
  init,
  getOperations,
  setOperation,
}
