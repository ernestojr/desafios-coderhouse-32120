import express from 'express'
import expressSession from 'express-session'
import http from 'http'
import passport from 'passport'
import find from 'lodash/find.js'
import { Strategy as LocalStrategy } from 'passport-local'

import apiRouter from './routers/api.js'
import users from './db/users.js'
import { isValidPassword, encryptPassword } from './utils.js'

const app = express()

const PORT = 3000

passport.use('login', new LocalStrategy((username, password, done) => {
  try {
    const user = find(users, ['username', username])
    if (!user) {
      console.log('User Not Found with username' + username)
      return done(null, false)
    }
    if (!isValidPassword(password, user.password)) {
      console.log('Invalid Password')
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    console.log('Error in login', error.message)
    done(error)
  }
}))

passport.use('register', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  try {
    const user = find(users, ['username', username])
    if (user) {
      console.log('User already exists.')
      return done(null, false)
    }
    const { body } = req
    const newUser = {
      ...body,
      password: encryptPassword(password),
    }
    users.push(newUser)
    console.log('User registration succesful.')
    done(null, newUser)
  } catch (error) {
    console.log('Error in register', error.message)
    done(error)
  }
}))

passport.serializeUser((user, done) => {
  console.log('serializeUser -> user', user)
  done(null, user.username)
});

passport.deserializeUser((username, done) => {
  console.log('deserializeUser -> username', username)
  try {
    done(null, find(users, ['username', username]))
  } catch (error) {
    done(error)
  }
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({
  secret: '3!$H4s5K36#s',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 50000,
  },
  rolling: true,
  resave: true,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in http://localhost:3000/')
})