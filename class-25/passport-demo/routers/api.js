import { Router } from 'express'
import passport from 'passport'
import find from 'lodash/find.js'
import pick from 'lodash/pick.js'
import users from '../db/users.js'

const router = Router()

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
}

router.get('/private', auth, (req, res) => {
  const { user } = req
  const result = find(users, ['username', user.username])
  res.json(pick(result, ['username','address']))
})

router.post('/login', passport.authenticate('login'), (req, res) => {
  const { user } = req
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Username or password is invalid' })
    return
  }
  res.json({ message: `Wellcome ${user.username}.` })
})

router.post('/logout', (req, res, next) => {
  const { user } = req
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.json({ message: `Goodbye ${user.username}.` })
  })
})

router.post('/register', passport.authenticate('register'), (req, res) => {
  const { user } = req
  console.log('register -> user', user);
  res.json({ message: `User ${user.username} was registered.` })
})

export default router
