import express from 'express'
import expressSession from 'express-session'
import http from 'http'

const app = express()
const PORT = 3001

app.use(express.json())
app.use(expressSession({
  secret: '3biXMV8#m5s7',
  resave: true,
  saveUninitialized: true,
}))

const USERNAME='ejrp'
const PASSWORD='pollito1234'


// --------------------------------------- ejemplo 02

const auth = (req, res, next) => {
  const { isAuth } = req.session
  if (isAuth) {
    next()
  } else{
    res.status(403).send('No tienes permiso para estar acá!!!')
  }
}

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === USERNAME && password === PASSWORD) {
    req.session.username = username
    req.session.isAuth = true
    res.status(200).send('Auth OK')
  } else {
    res.status(401).send('Username or password invalid!')
  }
})

app.delete('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.send('Adios')
    } else {
      res.send('Ah ocurrido un error', error.message)
    }
  })
})

app.get('/private', auth, (req, res) => {
  const { username } = req.session
  res.status(200).send(`Hola ${username}`)
})

// --------------------------------------- ejemplo 01

/*app.get('/', (req, res) => {
  if (req.session.contador) {
    req.session.contador += 1
    res.send(`Hola, esta es tu visita #${req.session.contador}`)
  } else {
    req.session.contador = 1
    res.send('Bienvenido!')
  }
})

app.delete('/', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.send('Adios')
    } else {
      res.send('Ah ocurrido un error', error.message)
    }
  })
})*/

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})