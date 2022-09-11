const express = require('express')
const useragent = require('express-useragent')
const path = require("path")

const app = express()
const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.static(path.join(__dirname, 'files')))
app.use(useragent.express())

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

const fileName = 'node-modules-meme.png'
const fileUrl = `http://localhost:${PORT}/${fileName}`

app.get('/', (req, res) => {
  const htmlBody = `
  <p>Opciones del sitio</p
  <ul>
    <li><a href="${fileUrl}">Meme</a></li>
    <li><a href="/agente">Agente</a></li>
    <li><a href="/hora">Hora del Servidor</a></li>
  </ul>`
  res.send(htmlBody)
})

app.get('/agente', (req, res) => {
  const htmlBody = `<p>Explorador web: <b>${req.useragent.browser}</b></p>
  <p>Version: <b>${req.useragent.version}</b></p>
  <p>Sistema Operativo: <b>${req.useragent.os}</b></p>
  <p>Plataforma: <b>${req.useragent.platform}</b></p>`
  res.send(htmlBody)
})

app.get('/hora', (req, res) => {
  const dayjs = require('dayjs')
  const htmlBody = `<h1>La hora del servidor es ${dayjs().format('hh:mm:ss')}</h1>`
  res.send(htmlBody)
})