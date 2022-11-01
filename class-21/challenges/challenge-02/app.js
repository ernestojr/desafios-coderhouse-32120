import express from 'express'
import http from 'http'
import { faker } from '@faker-js/faker/locale/es'

const app = express()
const PORT = 3000
const { name, color } = faker

function getUsers(count = 10) {
  const users = []
  for (let index = 0; index < parseInt(count); index++) {
    users.push({
      id: index + 1,
      nombre: name.firstName(),
      apellido: name.lastName(),
      color: color.human(),
    })
  }
  return users
}

app.get('/test', (req, res) => {
  const { query } = req
  res.json(getUsers(query.cant))
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})