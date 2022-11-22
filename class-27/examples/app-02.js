import yargs from 'yargs/yargs'

const argv = yargs(
    process.argv.slice(2)
  )
  .default({
    p: 8080,
    e: 'dev',
    d: false,
  })
  .alias({
    p: 'port',
    e: 'environment',
    d: 'debug',
  })
  .argv

console.log('argv', argv);