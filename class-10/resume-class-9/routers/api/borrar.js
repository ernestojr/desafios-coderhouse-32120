const { Router } = require('express')
const UsuariosController = require('../../controllers/usuarios')

const router = Router()

router.delete('/:id', (req, res, next) => {
  try {
    UsuariosController.borrarPorId(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router