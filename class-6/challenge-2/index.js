(function (run) {
  if(!run) return

  const express = require('express')

  const app = express()

  const PORT = 8080

  const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })

  server.on("error", error => console.log(`Error en servidor ${error}`))

  // A) '/' en esta ruta raíz, el servidor enviará string con un elemento de título nivel 1 (un h1 en formato HTML) que contenga el mensaje: 'Bienvenidos al servidor express' en color azul.
  // B) '/visitas' donde con cada request, el servidor devolverá un mensaje con la cantidad de visitas que se hayan realizado a este endpoint. Por ej. 'La cantidad de visitas es 10'
  // C) '/fyh' donde se devolverá la fecha y hora actual en formato objeto: { fyh: '11/1/2021 11:36:04' }

  app.set('cantidad', 0)

  app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al servidor express</h1>')
  })

  app.get('/visitas', (req, res) => {
    let cantidad = app.get('cantidad')
    cantidad += 1
    res.send(`La cantidad de visitas es ${cantidad}`)
    app.set('cantidad', cantidad)
  })

  app.get('/fyh', (req, res) => {
    const dayjs = require('dayjs')
    res.json({ fyh: dayjs().format('DD/MM/YYYY hh:mm:ss') })
  })

})(true);