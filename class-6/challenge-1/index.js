(function (run) {
  if (!run) return

  const http = require('http')
  
  const server = http.createServer((peticion, respuesta) => {
    // Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
    // Entre las 13 y las 19 hs será 'Buenas tardes!'. 
    // De 20 a 5 hs será 'Buenas noches!'.
    const ahora = new Date()
    const hora = ahora.getHours()
    let mensaje = ''
    if (hora >= 6 && hora <= 12) {
      mensaje = 'Buenos días!'
    } else if (hora >= 13 && hora <= 19) {
      mensaje = 'Buenos tardes!'
    } else {
      mensaje = 'Buenos noches!'
    }
    respuesta.end(mensaje)
  })
  
  const connectedServer = server.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
  })
  
})(true)
