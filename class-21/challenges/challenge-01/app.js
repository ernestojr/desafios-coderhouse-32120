import express from 'express'
import http from 'http'

const app = express()
const PORT = 3000

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

function getRamdonUser() {
  return {
    nombre: nombres[random(0, 5)],
    apellido: apellidos[random(0, 5)],
    color: colores[random(0, 5)],
  }
}

function getUsers(count = 10) {
  const users = []
  for (let index = 0; index < count; index++) {
    users.push(getRamdonUser())
  }
  return users
}

app.get('/test', (req, res) => {
  res.json(getUsers())
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})