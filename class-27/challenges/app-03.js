
//MODO=dev PUERTO=8080 DEBUG=true

//{ modo: 'dev', puerto: 8080, debug: true }

//{ modo: 'prod', puerto: 0, debug: false }
import 'dotenv/config.js'
import config from './config.js'

console.log({
  modo: config.MODO,
  puerto: config.PUERTO,
  debug: config.DEBUG,
})
