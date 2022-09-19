const express = require('express')
const path = require('path')
const cors = require('cors')
const routers = require('./routers')
const { errorHandler } = require('./utils/errores')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(cors())

app.use('/usuarios/', express.static(path.join(__dirname, 'public/')))
app.use('/api/usuarios/avatares', express.static(path.join(__dirname, 'pictures/')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routers)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
