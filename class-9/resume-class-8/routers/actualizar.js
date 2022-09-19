const { Router } = require('express')
const UsuariosController = require('../controllers/usuarios')
const validadorActualizarUsuarioMiddleware = require('../middlewares/validador-actualizar-usuarios')

const router = Router()

router.put('/:id', validadorActualizarUsuarioMiddleware, async (req, res, next) => {
  try {
    await UsuariosController.actualizarPorId(req.params.id, req.body)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router