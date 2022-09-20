const BD = require('../db')

class UsuariosController {

  static async crear(data) {
    const logPrefix = '[UsuariosController][crear]'
    try {
      data.estado = 'activo'
      console.log(`${logPrefix} intentando crear usuario.`)
      const result = await BD.crear(data)
      const usuario = await BD.obtenerPorId(result.insertedId)
      console.log(`${logPrefix} usuario creado con éxito.`)
      return usuario
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async obtener(query) {
    const logPrefix = '[UsuariosController][obtener]'
    try {
      console.log(`${logPrefix} intentando obtener usuarios con filtro ${JSON.stringify(query)}.`)
      const usuarios = await BD.obtener(query)
      console.log(`${logPrefix} usuarios encontrados con éxito.`)
      return usuarios
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async obtenerPorId(idUsuario) {
    const logPrefix = '[UsuariosController][obtenerPorId]'
    try {
      console.log(`${logPrefix} intentando obtener usuario ${idUsuario}.`)
      const usuario = await BD.obtenerPorId(idUsuario)
      console.log(`${logPrefix} usuario ${idUsuario} encontrado con éxito.`)
      return usuario
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async actualizarPorId(idUsuario, data) {
    const logPrefix = '[UsuariosController][actualizarPorId]'
    try {
      console.log(`${logPrefix} intentando actualizar usuario ${idUsuario}.`)
      await BD.actualizarPorId(idUsuario, data)
      console.log(`${logPrefix} usuario ${idUsuario} actualizado con éxito.`)
    } catch (error) {
      console.log(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async borrarPorId(idUsuario) {
    const logPrefix = '[UsuariosController][borrarPorId]'
    try {
      console.log(`${logPrefix} intentando borrar usuario ${idUsuario}.`)
      await BD.borrarPorId(idUsuario)
      console.log(`${logPrefix} usuario ${idUsuario} borrado con éxito.`)
    } catch (error) {
      console.error(`${logPrefix} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async actualizarAvatarPorId(idUsuario, file) {
    const logPrefix = '[UsuariosController][actualizarAvatarPorId]'
    try {
      const avatar = `${process.env.BASE_HOST}/api/usuarios/avatares/${file.filename}`
      console.log(`${logPrefix} intentando actualizar avatar de usuario ${idUsuario}.`)
      await UsuariosController.actualizarPorId(idUsuario, { avatar })
      console.log(`${logPrefix} avatar de usuario ${idUsuario} actualizado con éxito.`)
      return { avatar }
    } catch (error) {
      console.log(`${logPrefix} ${error.message}`)
      throw error
    }
  }
}

module.exports = UsuariosController