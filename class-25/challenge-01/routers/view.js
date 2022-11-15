import { Router } from 'express'
import find from 'lodash/find.js'
import users from '../db/users.js'

const router = Router()

const auth = (req, res, next) => {
  const { isAuth } = req.session
  if (isAuth) {
    next()
  } else{
    res
      .cookie('data', JSON.stringify({ message: 'Unauthorized to zone private.', isError: true }), { maxAge: 2000, signed: true })
      .redirect('/login')
  }
}

router.get('/',(req, res) => {
  res.render('home')
})

router.get('/login',(req, res) => {
  let data = req.signedCookies.data
  if (data) {
    data = JSON.parse(data)
  }
  res
    .clearCookie('data')
    .render('login', data)
})

router.get('/register',(req, res) => {
  let data = req.signedCookies.data
  if (data) {
    data = JSON.parse(data)
  }
  res
    .clearCookie('data')
    .render('register', data)
})

router.get('/private', auth, (req, res) => {
  const user = find(users, ['username', req.session.username])
  res.render('private', user)
})

export default router
