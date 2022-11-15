import { Router } from 'express'
import find from 'lodash/find.js'
import users from '../db/users.js'

const router = Router()

router.post('/login', (req, res) => {
  const { body: { username, password } } = req
  const user = find(users, (u) => u.username === username && u.password === password)
  if (!user) {
    res
      .cookie('data', JSON.stringify({ message: 'Username or password is invalid', isError: true }), { maxAge: 2000, signed: true })
      .redirect('/login')
    return
  }
  if (!user.counter) {
    user.counter = 0
  }
  user.counter += 1
  req.session.username = username
  req.session.isAuth = true
  res.redirect('/private')
})

router.get('/logout', (req, res) => {
  const username = req.session.username
  req.session.destroy(error => {
    if (error) {
      console.log('Ah ocurrido un error', error.message)
    }
    res
      .cookie('data', JSON.stringify({ message: `Goodbye ${username}.`, isOk: true }), { maxAge: 2000, signed: true })
      .redirect('/login')
  })
})

router.post('/register',(req, res) => {
  const { body: { username, password, address } } = req
  const user = find(users, ['username', username])
  if (user) {
    res
      .cookie('data', JSON.stringify({ message: `User ${username} already exist.`, isError: true }), { maxAge: 2000, signed: true })
      .redirect('/register')
    return
  }
  users.push({ username, password, address })
  res
    .cookie('data', JSON.stringify({ message: `User ${username} was registered.`, isOk: true }), { maxAge: 2000, signed: true })
    .redirect('/login')
})

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default router
