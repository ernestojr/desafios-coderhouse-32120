const Joi = require('joi')
const { BadRequestError } = require('../utils/errores')

const usuarioSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(30)
    .trim(true)
    .required(),
  apellido: Joi.string()
    .min(3)
    .max(30)
    .trim(true)
    .required(),
  edad: Joi.number()
    .integer()
    .required(),
  correo: Joi.string()
    .email()
    .required(),
  telefono: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
})

module.exports = async function validadorCrearUsuarioMiddleware(req, res, next) {
  const logPrefix = '[validadorCrearUsuarioMiddleware]'
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