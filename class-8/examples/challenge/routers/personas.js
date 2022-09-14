const express = require('express')
const { Router } = express

const router = Router(Router)

const personas = [
  {
    id: 1,
    nombre: 'Rick',
    apellido: 'Sanchez',
    dimension: 'C-137',
    edad: '70',
  },
  {
    id: 2,
    nombre: 'Morty',
    apellido: 'Smith',
    dimension: 'C-137',
    edad: '15',
  },
  {
    id: 3,
    nombre: 'Summer',
    apellido: 'Smith',
    dimension: '?',
    edad: '17',
  },
]

let siguienteID = 4

router.post('/personas', (req, res) => {
  let { body : data } = req
  data = { id: siguienteID, ...data }
  personas.push(data)
  siguienteID++
  res.status(200).json(data)
})

router.get('/personas', (_, res) => {
  res.status(200).json(personas)
})

module.exports = router