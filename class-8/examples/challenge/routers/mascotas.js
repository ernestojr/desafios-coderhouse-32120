const express = require('express')
const { Router } = express

const router = Router(Router)

const mascotas = [
  {
    id: 1,
    nombre: 'Snowball',
    raza: 'Maltez',
    edad: '3',
  },
]

let siguienteID = 1

router.post('/mascotas', (req, res) => {
  let { body : data } = req
  data = { id: siguienteID, ...data }
  mascotas.push(data)
  siguienteID++
  res.status(200).json(data)
})

router.get('/mascotas', (_, res) => {
  res.status(200).json(mascotas)
})

module.exports = router