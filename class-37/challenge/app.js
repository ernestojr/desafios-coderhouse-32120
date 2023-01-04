import express from 'express'
import {
  addition,
  subtraction,
  multiplication,
  division,
} from 'ch-basic-calculator'
import http from 'http'

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Hello Yarn!</h1>')
})

app.get('/addition', (req, res) => {
  const { a, b } = getParams(req.query)
  res.send(`<h1>El resultado es: ${addition(a, b)}</h1>`)
})

app.get('/subtraction', (req, res) => {
  const { a, b } = getParams(req.query)
  res.send(`<h1>El resultado es: ${subtraction(a, b)}</h1>`)
})

app.get('/multiplication', (req, res) => {
  const { a, b } = getParams(req.query)
  res.send(`<h1>El resultado es: ${multiplication(a, b)}</h1>`)
})

app.get('/division', (req, res) => {
  const { a, b } = getParams(req.query)
  res.send(`<h1>El resultado es: ${division(a, b)}</h1>`)
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})

const getParams = (container) => {
  const a = parseInt(container.a, 10)
  const b = parseInt(container.b, 10)
  return { a, b }
}