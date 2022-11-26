import express from 'express'
import http from 'http'
import { fork } from 'child_process'

const app = express()

const PORT = process.env.NODE_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function calculo() {
  let result = 0
  console.log('calculando...');
  for (let i = 1; i < 6e9; i++) {
    result += i
  }
  return result
}

let visitas = 0

app.get('/', (req, res) => {
  res.send(`<h1>Visita #${++visitas}!</h1>`)
})

app.get('/calcular', (req, res) => {
  res.send(`El valor es: ${calculo()}`)
})

app.get('/calcular-2', (req, res) => {
  const child = fork('./calculo.js')
  child.on('message', (msg) => {
    console.log(`Message from calculo.js: ${msg}`)
    if (msg === 'ready') {
      child.send('Hello child!')
      return child.send('start-task')
    }
    if (msg === 'Adios!') return
    res.send(`El valor es: ${msg}`)
  })
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})