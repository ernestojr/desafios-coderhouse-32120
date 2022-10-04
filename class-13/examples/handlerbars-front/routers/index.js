import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  try {
    res.send('OK')
  } catch (error) {
    next(error)
  }
})

export default router
