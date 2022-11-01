import express from 'express'
import http from 'http'
import usuariosRouter from './routes/usuarios.js'

const app = express()

app.use(express.json())
app.use('/api/usuarios', usuariosRouter)

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
