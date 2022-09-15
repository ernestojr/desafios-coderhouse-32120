const express = require('express')
const { Router } = express

const router = Router()

// Middleware a nivel del Router

const paso1 = (req, res, next) => {
  console.log('Se llamó el middleware paso 1')
  next()
}

const paso2 = (req, res, next) => {
  console.log('Se llamó el middleware paso 2')
  next()
}

const paso3 = (req, res, next) => {
  console.log('Se llamó el middleware paso 3')
  next()
}

router.post('/productos', paso1, paso2, paso3, (req, res) => {
  console.log('Here from router (POST)')
  res.status(200).end()
})

router.get('/productos', (req, res) => {
  console.log('Here from router (GET)')
  res.status(200).end()
})

router.get('/productos/:id', (req, res) => {
  console.log('Here from router (GET)')
  res.status(200).end()
})

router.put('/productos/:id', (req, res) => {
  console.log('Here from router (PUT)')
  res.status(200).end()
})

router.delete('/productos/:id', (req, res) => {
  console.log('Here from router (DELETE)')
  res.status(200).end()
})

module.exports = router