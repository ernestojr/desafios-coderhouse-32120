import express from 'express'
import session from 'express-session'
import connectSqlite3 from 'connect-sqlite3'
import http from 'http'
import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'

import router from './routers/index.js'
import views from './routers/views.js'
import { init } from './db/mongodb.js'
import UserModel from './models/user.js'

await init()

const SQLiteStore = connectSqlite3(session)
const app = express()

const PORT = 3000

const options = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
}

passport.use(new TwitterStrategy(options, (token, tokenSecret, profile, done) => {
  UserModel.findOne({ twitter_id: profile.id })
    .then((user) =>{
      if (!user) {
        console.log(`User with twitter id ${profile.id} not found. Creating...`)
        UserModel.create({ twitter_id: profile.id, firstname: profile.displayName })
          .then(newUser => done(null, newUser))
      } else {
        done(null, user)
      }
    })
    .catch(error => {
      console.log('Error in sign-in', error.message)
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  UserModel.findOne({ _id })
    .then(user => done(null, user))
    .catch(done)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  store: new SQLiteStore({
    table: 'sessions',
    db: 'sessions.sqlite',
    dir: '.'
  }),
  secret: '3!$H4s5K36#s',
  resave: false, 
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', views)
app.use('/api', router)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in http://localhost:3000/')
})