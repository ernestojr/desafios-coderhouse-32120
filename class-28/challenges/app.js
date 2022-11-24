import minimist from 'minimist'

const params = minimist(process.argv.slice(2))

process.on('exit', function (code) {
  console.log(`Proceso llama evento exit con código: ${code}`);
})

function getAVG(values) {
  const count = values.length
  let total = values.reduce((previous, current) => current += previous)
  return total /= count
}

function getMax(values) {
  return Math.max(...values)
}

function getMin(values) {
  return Math.min(...values)
}

function validParams(values) {
  if (!values.length) {
    console.log({
      error: {
        descripcion: 'entrada vacia'
      }
    });
    process.exit(-4)
  }
  const types = []
  const invalids = values.reduce((invalid, value) => {
    const type = typeof value
    types.push(type)
    if (type === 'number') return invalid
    return invalid + 1
  }, 0)
  if (invalids) {
    console.log(JSON.stringify({
      descrioncion: 'error de tipo',
      numeros: values,
      tipos: types,
    }, null, 2));
    process.exit(-5)
  }
  return true
}

validParams(params._)

console.log(JSON.stringify({
  numeros: params._,
  promedio: getAVG(params._),
  max: getMax(params._),
  min: getMin(params._),
  ejecutable: process.title,
  pid: process.pid,
}, null, 2));