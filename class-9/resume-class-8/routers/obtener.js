const { Router } = require('express')
const UsuariosController = require('../controllers/usuarios')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await UsuariosController.obtener(req.query)
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await UsuariosController.obtenerPorId(req.params.id)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

module.exports = router