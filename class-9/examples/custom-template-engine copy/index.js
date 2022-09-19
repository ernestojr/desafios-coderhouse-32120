const express = require('express')
const path = require('path')
const fs = require('fs')

const productos = require('./routers/productos')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.engine('ntl', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err))
    }
    const rendered = content.toString()
                            .replace('#nombre#', options.nombre)
                            .replace('#descripcion#', options.descripcion)
                            .replace('#precio#', options.precio)
                            .replace('#imagen#', options.imagen)
    return callback(null, rendered)
  });
});
app.set('views', './views')
app.set('view engine', 'ntl')

app.use('/api', productos)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
