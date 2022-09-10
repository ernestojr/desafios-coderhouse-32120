(function (run) {
  if (!run) return

  console.log('⭐ [Sync] Lectura de archivos.')

  const fs = require('fs')
  console.log('🚀 Intentando leer el contenido de un archivo...')
  const data = fs.readFileSync('./text-input-file.txt', 'utf-8')
  console.log('😎 Finalizó la lectura.')
  console.log('Acá el contenido:\n', data)

})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Sync] Escritura de archivos.')

  const fs = require('fs')
  const contenido = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.\n'
  console.log('🚀 Iniciando la escritura...')
  fs.writeFileSync('./text-output-file.txt', contenido, 'utf-8')
  console.log('😎 Finalizó la escritura.')
  
})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Sync] Actualización de archivos.')

  const fs = require('fs')
  const contenido = 'Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio.\n'
  console.log('🚀 Iniciando el agregado de contenido...')
  fs.appendFileSync('./text-output-file.txt', contenido, 'utf-8')
  console.log('😎 Finalizó la escritura.')
  
})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Sync] Borrado de archivos.')

  const fs = require('fs')
  console.log('🚀 Intentando borrar el archivo...')
  fs.unlinkSync('./text-output-file.txt')
  console.log('😎 Finalizó el borrado del archivo.')
  
})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Sync] Manejo de errores al manipular archivos.')

  try {
    const fs = require('fs')
    console.log('🚀 Intentando leer el contenido de un archivo...')
    const data = fs.readFileSync('./text-output-file.txt', 'utf-8')
    console.log('😎 Finalizó la lectura.')
    console.log('Acá el contenido:\n', data)
  } catch (error) {
    console.log(error)
  }

})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Async] Lectura de archivos.')

  const fs = require('fs')

  const byteSize = str => Buffer.from(str).length

  console.log('🚀 Intentando leer el contenido de un archivo...')
  fs.readFile('./text-input-file.txt', 'utf-8', (error, contenido) => {
    if (error) {
      console.log('😱 Ocurrio un error durante la lectura:', error.message)
    } else {
      console.log('😎 Finalizó la lectura.', byteSize(contenido), 'Bytes')
      console.log('Acá el contenido:\n', contenido)
    }
  })

})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Async] Escritura de archivos.')

  const fs = require('fs')
  const contenido = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.\n'
  console.log('🚀 Iniciando la escritura...')
  fs.writeFile('./text-output-file.txt', contenido, (error) => {
    if (error) {
      console.log('😱 Ocurrio un error durante la escritura:', error.message)
    } else {
      console.log('😎 Finalizó la escritura.')
    }
  })
})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Async] Actualización de archivos.')

  const fs = require('fs')
  const contenido = 'Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio.\n'
  console.log('🚀 Iniciando el agregado de contenido...')
  fs.appendFile('./text-output-file.txt', contenido, (error) => {
    if (error) {
      console.log('😱 Ocurrio un error durante la escritura:', error.message)
    } else {
      console.log('😎 Finalizó la escritura.')
    }
  })  
})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Async] Borrado de archivos.')

  const fs = require('fs')
  console.log('🚀 Intentando borrar el archivo...')
  fs.unlink('./text-output-file.txt', (error) => {
    if (error) {
      console.log('😱 Ocurrio un error durante el borrado:', error.message)
    } else {
      console.log('😎 Finalizó el borrado del archivo.')
    }
  })
})(false);

(function (run) {
  if (!run) return

  console.log('⭐ [Async] Crear una carpeta.')

  const fs = require('fs')

  console.log('🚀 Intentando crear carpeta...')
  fs.mkdir('./mi-nueva-carpeta', (error) => {
    if (error) {
      console.log('😱 Ocurrio un error durante la creación de carpeta:', error.message)
    } else {

      console.log('😎 Finalizó la creación de carpeta.')
      console.log('😉 Ahora agregaremos un archivo a las nueva carpeta.')

      const contenido = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.\n'

      fs.writeFile('./mi-nueva-carpeta/demo-file.txt', contenido, (error) => {
        if (error) {
          console.log('😱 Ocurrio un error durante la escritura:', error.message)
        } else {

          console.log('😎 Finalizó la escritura.')
          console.log('😉 Ahora veremos el contenido de la nueva carpeta.')

          fs.readdir('./mi-nueva-carpeta', (error, nombres) => {
            if (error) {
              console.log('😱 Ocurrio un error:', error.message)
            } else {

              console.log('😎 Finalizamos con éxito.')
              console.log('Acá el contenido:\n', nombres)
              console.log('😱 OMG donde me encuentro ahora?')

            }
          })
        }
      })
    }
  })

})(false);

(async function (run) {
  if (!run) return

  console.log('⭐ Ejemplo guia para el desafio entregable.')

  const fs = require('fs')

  const escribirArchivo = async (ruta, contenido) => {
    try {
      await fs.promises.writeFile(ruta, contenido, 'utf-8')
    } catch (error) {
      console.log('😱 Ocurrio un error durante la escritura:', error)
      throw new Error(error.message)
    }
  }

  const leerArchivo = async (ruta) => {
    try {
      const data = await fs.promises.readFile(ruta, 'utf-8')
      return data
    } catch (error) {
      console.log('😱 Ocurrio un error durante la lectura:', error)
      throw new Error(error.message)
    }
  }

  try {
    const users = [
      {
        id: 1,
        username: 'pedritorojas01',
        fullname: 'Pedro Rojas',
        email: 'pedritorojas01@gmail.com',
        phone: '09001728888',
      },
    ]
    await escribirArchivo('./users.txt', JSON.stringify(users, null, 2))
    const contenidoString = await leerArchivo('./users.txt')
    const contenidoJSON = JSON.parse(contenidoString)
    contenidoJSON.push({
      id: 2,
      username: 'ricardorojas03',
      fullname: 'Ricardo Rojas',
      email: 'ricardorojas03@gmail.com',
      phone: '09001728888',
    })
    console.log('contenidoJSON', contenidoJSON)
    await escribirArchivo('./users.txt', JSON.stringify(contenidoJSON, null, 2))
  } catch (error) {
    console.log('😱😱😱 Ocurrion un error durante la operación:', error)
  }
})(true);