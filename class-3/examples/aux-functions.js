function obtFechaHoraActual() {
  const fechaActual = new Date()
  return `[⌚${fechaActual.toISOString()}]`
}

module.exports.enviarMensajeAsincrono = function (mensaje) {
  console.log(`${obtFechaHoraActual()} 📧 Enviado mensaje: ${mensaje}`)
  const segundos = 5
  const milisegundos = segundos * 1000
  setTimeout(() => {
    console.log(`${obtFechaHoraActual()} 📧 Mensaje enviado correctamente.`)
  }, milisegundos)
  console.log(`${obtFechaHoraActual()} 📧 Fin de la ejecución de la función enviarMensajeAsincrono.`)
};

module.exports.enviarMensajeSincrono = function (mensaje) {
  console.log(`${obtFechaHoraActual()} 📧 Enviado mensaje: ${mensaje}`)
  console.log(`${obtFechaHoraActual()} 📧 Mensaje enviado correctamente.`)
  console.log(`${obtFechaHoraActual()} 📧 Fin de la ejecución de la función enviarMensajeSincrono.`)
};

module.exports.obtFechaHoraActual = obtFechaHoraActual;
