import operations from '../services/operations.service.js'

export async function addition(req, res) {
  const { a, b } = getParams(req.query)
  const data = await operations.addition(a, b)
  return res.status(200).json(data)
}

export async function subtraction(req, res) {
  const { a, b } = getParams(req.query)
  const data = await operations.subtraction(a, b)
  return res.status(200).json(data)
}

export async function multiplication(req, res) {
  const { a, b } = getParams(req.query)
  const data = await operations.multiplication(a, b)
  return res.status(200).json(data)
}

export async function division(req, res) {
  const { a, b } = getParams(req.query)
  const data = await operations.division(a, b)
  return res.status(200).json(data)
}

export async function getOperations(_, res) {
  const data = await operations.getOperations()
  return res.status(200).json(data)
}

export default {
  addition,
  subtraction,
  multiplication,
  division,
  getOperations,
}

const getParams = (container) => {
  const a = parseFloat(container.a, 10)
  const b = parseFloat(container.b, 10)
  return { a, b }
}