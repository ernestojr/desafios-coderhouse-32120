import express from 'express'
import session from 'express-session'
import http from 'http'
import sessionFileStore from 'session-file-store'

const app = express()
const PORT = 3000
const FileStore = sessionFileStore(session)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  store: new FileStore({
    path: '../sessions', // El directorio donde se almacenarán los archivos de la sesión. El valor predeterminado es ./sessions
    ttl: 10, // Tiempo de vida de la sesión en segundos. Predeterminado a 3600
    retries: 2, // El número de reintentos para obtener datos de sesión de un archivo de sesión. Predeterminado a 5
  }),
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