import express from 'express'
import http from 'http'
import minimist from 'minimist'
import cluster from 'cluster'
import os from 'os'

const opts = {
  default: {
    port: 8080,
    mode: 'fork',
  },
  alias: {
    p: 'port',
    m: 'mode',
  }
}

const { port: PORT, mode } = minimist(process.argv.slice(2), opts)

if (mode === 'cluster' && cluster.isPrimary) { // Require node in version 16 or higher. Other versions call isMaster property.
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} | code ${code} | signal ${signal}`)
    console.log('Starting a new worker...')
    cluster.fork()
  })
} else {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))

  app.get('/datos', (req, res) => {
    console.log(`Here from process ${process.pid} litening in port ${PORT}.`);
    res.send(`<h1>Servidor express en ${PORT} - PID ${process.pid} - ${(new Date()).toLocaleString()}</h1>`)
  })

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/ from process ${process.pid} in mode ${mode}`)
  })
}

