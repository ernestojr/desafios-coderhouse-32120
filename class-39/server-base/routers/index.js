import { Router } from 'express'
import person from './persons.routers.js'

const router = Router()

router.get('/', (req, res) => {
  res.render('home')
})

router.use('/', person)

export default router