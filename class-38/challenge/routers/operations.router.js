import { Router } from 'express'
import {
  addition,
  subtraction,
  multiplication,
  division,
  getOperations,
} from '../controllers/operations.controller.js'

const router = Router()

router.get('/addition', addition)

router.get('/subtraction', subtraction)

router.get('/multiplication', multiplication)

router.get('/division', division)

router.get('/operations', getOperations)

export default router
