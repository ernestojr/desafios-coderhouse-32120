import { Router } from 'express'
import UserController from '../controllers/users.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth, async (req, res, next) => {
  try {
    const { body } = req
    const user = await UserController.create(body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/', auth, async (req, res, next) => {
  console.log('req.user', req.user);
  try {
    const { query = {} } = req
    const users = await UserController.get(query)
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', auth, async (req, res, next) => {
  try {
    const { params: { id } } = req
    const user = await UserController.getByid(id)
    if (!user) {
      return res.status(404).end()
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', auth, async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const { modifiedCount, matchedCount } = await UserController.uploadById(id, body)
    if (!modifiedCount || !matchedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { params: { id } } = req
    const { deletedCount } = await UserController.deleteById(id)
    if (!deletedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default router
