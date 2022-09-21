const express = require('express')
const routers = require('./routers')
const handlebars = require('express-handlebars')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/api', routers)

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${process.env.ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))