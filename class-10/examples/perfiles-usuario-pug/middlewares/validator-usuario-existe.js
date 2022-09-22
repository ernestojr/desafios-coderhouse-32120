const UsuariosController = require('../controllers/usuarios')

module.exports = async function validadorUsuarioExisteMiddleware(req, res, next) {
  const logPrefix = '[validadorUsuarioExisteMiddleware]'
  const usuarioId = req.params.id
  try {
    console.log(`${logPrefix} intentando obtener usuario ${usuarioId}...`)
    req.usuario = await UsuariosController.obtenerPorId(usuarioId)
    console.log(`${logPrefix} validación exitosa de usuario ${usuarioId}.`)
    next()
  } catch (error) {
    console.error(`${logPrefix} validación fallida de usuario ${usuarioId}: ${error.message}`)
    next(error)
  }
}