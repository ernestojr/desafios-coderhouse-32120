//node app.js 1 2 3 -m dev -p 8080 -d
//{ modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }

//node app.js 1 2 3

//{ modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }


import pick from 'lodash/pick.js'
import minimist from 'minimist'

const opts = {
  default: {
    modo: 'prod',
    puerto: 0,
    debug: false,
  },
  alias: {
    p: 'puerto',
    m: 'modo',
    d: 'debug',
  }
}

const params = minimist(process.argv.slice(2), opts)
params.otros = params._
console.log('params', pick(params, ['modo', 'puerto', 'debug', 'otros']));