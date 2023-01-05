import { getRepository } from './repositories/index.js'

getRepository().init()

export function getOperations() {
  return getRepository().getOperations()
}

export function setOperation(data) {
  return getRepository().setOperation(data)
}

export default {
  getOperations,
  setOperation,
}
