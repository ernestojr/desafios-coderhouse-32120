import express from 'express'
import http from 'http'
import minimist from 'minimist'
import cluster from 'cluster'
import os from 'os'

const opts = {
  default: {
    port: 8080,
    cluster: false,
  },
  alias: {
    p: 'port',
    c: 'cluster',
  }
}

const { port: PORT, cluster : clusterMode } = minimist(process.argv.slice(2), opts)

if (clusterMode && cluster.isPrimary) { // Require node in version 16 or higher. Other versions call isMaster property.
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

  function calcularRandoms(min, max, cant) {
    let randoms = []
    for (let i = 0; i < cant; i++) {
      let random = parseInt(Math.random() * (max - min + 1)) + min
      randoms.push(random)
    }
    return randoms
  }

  app.get('/ramdom-debug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    console.log(randoms)
    res.json({ randoms });
  })

  app.get('/ramdom-nodebug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    res.json({ randoms });
  })

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/`)
  })
}
