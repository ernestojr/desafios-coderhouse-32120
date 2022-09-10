const dayjs = require('dayjs')

const ahora = dayjs()

console.log('La clase de hoy', dayjs().format('DD-MM-YYYY'))

const proxima = ahora.add(2, 'day')

console.log('La próxima clase', proxima.format('DD-MM-YYYY'))
