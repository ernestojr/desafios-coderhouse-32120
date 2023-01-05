import {
  addition as bcAddition,
  subtraction as bcSubtraction,
  multiplication as bcMultiplication,
  division as bcDivision,
} from 'ch-basic-calculator'

import DB from '../db/operations.db.js'

export function addition(a, b) {
  return DB.setOperation(resultOperationHandler('addition', { a, b }, bcAddition(a, b)))
}

export function subtraction(a, b) {
  return DB.setOperation(resultOperationHandler('subtraction', { a, b }, bcSubtraction(a, b)))
}

export function multiplication(a, b) {
  return DB.setOperation(resultOperationHandler('multiplication', { a, b }, bcMultiplication(a, b)))
}

export function division(a, b) {
  return DB.setOperation(resultOperationHandler('division', { a, b }, bcDivision(a, b)))
}

export function getOperations() {
  return DB.getOperations()
}

export default {
  addition,
  subtraction,
  multiplication,
  division,
  getOperations,
}

function resultOperationHandler(operation, params, result) {
  return {
    operation,
    params,
    result,
    timestamps: Date.now(),
  }
}