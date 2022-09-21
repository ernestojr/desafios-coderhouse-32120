const { Router } = require('express')
const ProductosController = require('../controllers/ProductosController')

const router = Router()

router.get('/', (req, res) => {
  const productos = ProductosController.obtenerTodos(req.query)
  res.status(200).json(productos)
})

router.get('/:id', (req, res) => {
  const producto = ProductosController.obtenerPorId(req.params)
  res.render('productos', producto)
})

router.post('/', (req, res) => {
  const producto = ProductosController.crear(req.body)
  res.status(200).json(producto)
})

router.put('/:id', (req, res) => {
  res.status(204).end()
})

router.delete('/:id', (req, res) => {
  res.status(204).end()
})

module.exports = router