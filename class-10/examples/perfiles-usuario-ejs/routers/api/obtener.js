const { Router } = require('express')
const UsuariosController = require('../../controllers/usuarios')

const router = Router()

router.get('/', (req, res, next) => {
  try {
    const usuarios = UsuariosController.obtener(req.query)
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const usuario = UsuariosController.obtenerPorId(req.params.id)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

module.exports = router