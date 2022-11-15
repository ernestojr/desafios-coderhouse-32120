import { Router } from 'express'
import find from 'lodash/find.js'
import users from '../db/users.js'

const router = Router()

const auth = (req, res, next) => {
  const { isAuth } = req.session
  if (isAuth) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
}

router.get('/private', auth, (req, res) => {
  const user = find(users, ['username', req.session.username])
  res.json(user)
})

router.post('/login', (req, res) => {
  const { body: { username, password } } = req
  const user = find(users, (u) => u.username === username && u.password === password)
  if (!user) {
    res.status(401).json({ message: 'Username or password is invalid' })
    return
  }
  user.counter += 1
  req.session.username = username
  req.session.isAuth = true
  res.json({ message: `Wellcome ${username}.` })
})

router.post('/logout', (req, res) => {
  const username = req.session.username
  req.session.destroy(error => {
    if (error) {
      console.log('Ah ocurrido un error', error.message)
    }
    res.json({ message: `Goodbye ${username}.` })
  })
})

router.post('/register',(req, res) => {
  const { body: { username, password, address } } = req
  const user = find(users, ['username', username])
  console.log('user', user);
  if (user) {
    res.json({ message: `User ${username} already exist.` })
    return
  }
  users.push({ username, password, address, counter: 0 })
  res.json({ message: `User ${username} was registered.` })
})

export default router
