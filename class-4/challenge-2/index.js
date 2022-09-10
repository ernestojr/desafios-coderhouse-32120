(function (run) {
  if (!run) return

  console.log('⭐ [Sync] Desafio geneneral #02.')

  const fs = require('fs')

  const escribirArchivo = (ruta, contenido) => {
    try {
      console.log('🚀 Iniciando la escritura...');
      fs.writeFileSync(ruta, contenido, 'utf-8')
      console.log('😎 Finalizó la escritura.');
    } catch (error) {
      console.log('😱 Ocurrio un error durante la escritura:', error);
      throw new Error(error.message)
    }
  }

  const leerArchivo = (ruta) => {
    try {
      console.log('🚀 Iniciando la lectura...');
      const data = fs.readFileSync(ruta, 'utf-8')
      console.log('😎 Finalizó la lectura.');
      console.log('Acá el contenido:\n', data);
    } catch (error) {
      console.log('😱 Ocurrio un error durante la lectura:', error);
      throw new Error(error.message)
    }
  }

  try {
    const fechaHora = (new Date()).toISOString()
    escribirArchivo('./date-time.txt', fechaHora)
    leerArchivo('./date-time.txt')
  } catch (error) {
    console.log('😱😱😱 Ocurrion un error durante la operación:', error);
  }

})(true);
