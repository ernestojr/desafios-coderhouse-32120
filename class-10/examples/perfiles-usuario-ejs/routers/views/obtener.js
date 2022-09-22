const { Router } = require('express')
const UsuariosController = require('../../controllers/usuarios')

const router = Router()

router.get('/', (req, res, next) => {
  try {
    const usuarios = UsuariosController.obtener(req.query)
    const data = {
      usuarios,
      isEmpty: !usuarios.length,
      detailUrlBase: `${process.env.BASE_HOST}/usuarios`,
    }
    res.render('usuarios', data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const usuario = UsuariosController.obtenerPorId(req.params.id)
    res.render('usuario', { ...usuario, tieneAvatar: !!usuario.avatar })
  } catch (error) {
    next(error)
  }
})

module.exports = router