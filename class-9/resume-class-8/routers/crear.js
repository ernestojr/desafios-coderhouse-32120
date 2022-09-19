const { Router } = require('express')
const UsuariosController = require('../controllers/usuarios')
const validadorCrearUsuarioMiddleware = require('../middlewares/validador-crear-usuarios')

const router = Router()

router.post('/', validadorCrearUsuarioMiddleware, async (req, res, next) => {
  try {
    const usuario = await UsuariosController.crear(req.body)
    res.status(201).json(usuario)
  } catch (error) {
    next(error)
  }
})

module.exports = router