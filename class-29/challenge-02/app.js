import express from 'express'
import http from 'http'
import minimist from 'minimist'
import cluster from 'cluster'
import os from 'os'

if (cluster.isPrimary) { // Require node in version 16 or higher. Other versions call isMaster property.
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

  const opts = {
    default: {
      port: 8080,
    },
    alias: {
      p: 'port',
    }
  }

  const { port: PORT } = minimist(process.argv.slice(2), opts)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    console.log(`Here from process ${process.pid} litening in port ${PORT}.`);
    res.send(`<h1>Servidor express en ${PORT} - PID ${process.pid} - ${(new Date()).toLocaleString()}</h1>`)
  })

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/ from process ${process.pid}`)
  })
}