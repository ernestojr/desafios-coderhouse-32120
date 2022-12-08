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

  app.get('/', (req, res) => {
    const primes = []
    const max = Number(req.query.max) || 1000
    for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
  })

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/ from process ${process.pid} in mode ${mode}`)
  })
}

function isPrime(num) {
  if ([2, 3].includes(num)) return true;
  else if ([2, 3].some(n => num % n == 0)) return false;
  else {
      let i = 5, w = 2;
      while ((i ** 2) <= num) {
          if (num % i == 0) return false
          i += w
          w = 6 - w
      }
  }
  return true
}
