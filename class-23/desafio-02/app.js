import express from 'express'
import expressSession from 'express-session'
import http from 'http'

const app = express()
const PORT = 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(expressSession({
  secret: '3biXMV8#m5s7',
  resave: true,
  saveUninitialized: true,
}))

app.get('/', (req, res) => {
  const { name } = req.query
  if (req.session.contador) {
    req.session.contador += 1
    res.send(`Hola, ${req.session.name || ''} esta es tu visita #${req.session.contador}`)
  } else {
    req.session.contador = 1
    req.session.name = name
    res.send(`Bienvenido ${name || ''}!`)
  }
})

app.delete('/olvidar', (req, res) => {
  const { name } = req.session
  req.session.destroy(error => {
    if (!error) {
      res.send(`Hasta luego ${name || ''}!`)
    } else {
      res.send('Ah ocurrido un error', error.message)
    }
  })
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})