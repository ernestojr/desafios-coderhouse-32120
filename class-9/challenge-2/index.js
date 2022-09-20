const express = require('express')
const fs = require('fs')
const filter = require('lodash/filter')
const includes = require('lodash/includes')

const cteRouter = require('./routers/cte')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('cte', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err))
    }
    let keys = Object.keys(options)
    keys = keys.filter(key => !includes(['_locals', 'cache', 'settings'], key))
    let rendered = content.toString()
    keys.forEach(key => {
      rendered = rendered.replace(`^^${key}$$`, options[key])
    })
    return callback(null, rendered)
  })
})
app.set('views', './views')
app.set('view engine', 'cte')

app.use('/api', cteRouter)

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
