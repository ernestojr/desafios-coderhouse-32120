const Joi = require('joi')
const { BadRequestError } = require('../utils/errores')

const usuarioSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(30)
    .trim(true),
  apellido: Joi.string()
    .min(3)
    .max(30)
    .trim(true),
  edad: Joi.number()
    .integer(),
  correo: Joi.string()
    .email(),
  telefono: Joi.string()
    .pattern(/^[0-9]+$/),
  estado: Joi.string()
    .trim(true)
    .pattern(/[activo|inactivo]/),
})

module.exports = async function validadorActualizarUsuarioMiddleware(req, res, next) {
  const logPrefix = '[validadorActualizarUsuarioMiddleware]'
  try {
    console.log(`${logPrefix} intentando validar body usuario...`)
    req.body = await usuarioSchema.validateAsync(req.body)
    console.log(`${logPrefix} validación body usuario exitosa.`)
    next()
  } catch (error) {
    console.error(`${logPrefix} validación fallida de body usuario: ${error.message}`)
    next(new BadRequestError('Ocurrio un error validando', error))
  }
}