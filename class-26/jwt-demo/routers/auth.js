import { Router } from 'express'
import UserModel from '../models/user.js'
import { encryptPassword, isValidPassword, generateToken } from '../utils.js'

const router = Router()

router.post('/sign-in', async (req, res, next) => {
  try {
    const { body: { email, password } } = req
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Username or password is invalid.' })
    }
    if (!isValidPassword(password, user.password)) {
      return res.status(401).json({ message: 'Username or password is invalid.' })
    }
    res.json({ access_token: generateToken(user) })
  } catch (error) {
    next(error) 
  }
})

router.post('/sign-up', async (req, res, next) => {
  try {
    const { body } = req
    const { email, password } = body
    let user = await UserModel.findOne({ email })
    if (user) {
      return res.status(422).json({ message: `User ${email} already exists.` })
    }
    const newUser = {
      ...body,
      password: encryptPassword(password),
    }
    user = await UserModel.create(newUser)
    res.json({ access_token: generateToken(user) })
  } catch (error) {
    next(error) 
  }
})

export default router
