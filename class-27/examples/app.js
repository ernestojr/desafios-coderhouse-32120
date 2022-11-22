// console.log('process.argv', process.argv.slice(2))
// process.argv.slice(2).map((arg, i) => console.log(i, arg))

import minimist from 'minimist'

const opts = {
  default: {
    p: 8080,
    e: 'dev',
    d: false,
  },
  alias: {
    p: 'port',
    e: 'environment',
    d: 'debug',
  }
}

const params = minimist(process.argv.slice(2), opts)

console.log('params', params);