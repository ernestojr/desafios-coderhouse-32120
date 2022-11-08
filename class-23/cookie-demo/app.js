import express from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'

const app = express()
const PORT = 3001

app.use(cookieParser('3biXMV8#m5s7'))

app.get('/cookie-insert', (req, res) => {
  res.cookie('saludo', 'Hola Coder House', { maxAge: 30000, signed: true }).send('Cookie insertada!')
})

app.get('/cookie-obtener', (req, res) => {
  res.send(req.signedCookies.saludo)
})

app.get('/cookie-borrar', (req, res) => {
  res.clearCookie('saludo').send('Cookie limpiada')
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})