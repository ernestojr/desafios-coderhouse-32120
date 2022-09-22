const { Router } = require('express')
const UsuariosController = require('../../controllers/usuarios')
const validadorCrearUsuarioMiddleware = require('../../middlewares/validador-crear-usuarios')

const router = Router()

router.post('/', validadorCrearUsuarioMiddleware, (req, res, next) => {
  try {
    const usuario = UsuariosController.crear(req.body)
    res.status(201).json(usuario)
  } catch (error) {
    next(error)
  }
})

module.exports = router