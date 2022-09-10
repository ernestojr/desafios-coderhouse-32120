const dayjs = require('dayjs')

function obtDiferencia(fecha) {
  const today = dayjs()
  const nacimiento = dayjs(fecha)
  return {
    anios: today.diff(nacimiento, 'years'),
    dias: today.diff(nacimiento, 'days'),
  }
}

const resultado = obtDiferencia('1968-11-29')

console.log(`Desde mi nacimiento han pasado ${resultado.anios} años.`)
console.log(`Desde mi nacimiento han pasado ${resultado.dias} días.`)
