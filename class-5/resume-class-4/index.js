const fs = require('fs');
  
const os = [
  {
    nombre: 'Windows',
    tipo: 'privativo',
    empresa: 'Microsoft',
  },
  {
    nombre: 'MS-DOS',
    tipo: 'privativo',
    empresa: 'Microsoft',
  },
  {
    nombre: 'UNIX',
    tipo: 'abierto',
    empresa: 'Open Source',
  },
  {
    nombre: 'MacOS',
    tipo: 'privativo',
    empresa: 'Apple',
  },
  {
    nombre: 'Ubuntu',
    tipo: 'abierto',
    empresa: 'Open Source',
  },
  {
    nombre: 'Android',
    tipo: 'abierto',
    empresa: 'Google',
  },
];

(function (run) {
  if (!run) return

  console.log('⭐ Ejercicio sync')

  function leerJSON(ruta) {
    try {
      const contenido = fs.readFileSync(ruta, 'utf-8')
      return JSON.parse(contenido)
    } catch (error) {
      console.log('😱 Ocurrio un error durante la lectura:', error)
      throw new Error(error.message)
    }
  }
  
  function escribirJSON(ruta, contenido) {
    try {
      fs.writeFileSync(ruta, JSON.stringify(contenido, null, 2), 'utf-8')
    } catch (error) {
      console.log('😱 Ocurrio un error durante la escritura:', error)
      throw new Error(error.message)
    }
  }

  try {
    escribirJSON('./os-sync.json', os)
    const data = leerJSON('./os-sync.json')
    console.log('Data recuperada desde el archivo:\n', data)
    console.log('Agregaremos un elemento más...')
    data.push({
      nombre: 'Chromium OS',
      tipo: 'abierto',
      empresa: 'Open Source',
    })
    escribirJSON('./os-sync.json', data)
    console.log('Listo, puedes verlo en el archivo...')
  } catch (error) {
    console.log('😱 Ocurrio un error durante la operación:', error)
    throw new Error(error.message)
  }

})(false);

(function (run) {
  if (!run) return

  console.log('⭐ Ejercicio callback')

  function leerJSON(ruta, callback) {
    fs.readFile(ruta, 'utf-8', (error, contenido) => {
      if (error) {
        console.log('😱 Ocurrio un error durante la lectura:', error)
        return callback(error)
      }
      callback(null, JSON.parse(contenido))
    })
  }
  
  function escribirJSON(ruta, contenido, callback) {
    fs.writeFile(ruta, JSON.stringify(contenido, null, 2), 'utf-8', (error) => {
      if (error) {
        console.log('😱 Ocurrio un error durante la escritura:', error)
        return callback(error)
      }
      callback(null)
    })
  }

  escribirJSON('./os-callback.json', os, (error) => {
    if (error) {
      console.log('😱 Ocurrio un error durante la operación:', error)
      return
    }

    leerJSON('./os-callback.json', (error, data) => {
      if (error) {
        console.log('😱 Ocurrio un error durante la operación:', error)
        return
      }

      console.log('Data recuperada desde el archivo:\n', data)
      console.log('Agregaremos un elemento más...')
      data.push({
        nombre: 'Chromium OS',
        tipo: 'abierto',
        empresa: 'Open Source',
      })

      escribirJSON('./os-callback.json', data, (error) => {
        if (error) {
          console.log('😱 Ocurrio un error durante la operación:', error)
          return
        }

        console.log('Listo, puedes verlo en el archivo...')
      })
    })
  })

})(false);

(function (run) {
  if (!run) return

  console.log('⭐ Ejercicio callback')

  function leerJSON(ruta) {
    return new Promise((resolve, reject) => {
      fs.promises.readFile(ruta, 'utf-8')
        .then(contenido => {
          resolve(JSON.parse(contenido))
        })
        .catch(error => {
          console.log('😱 Ocurrio un error durante la lectura:', error)
          reject(error)
        })
    })
  }
  
  function escribirJSON(ruta, contenido) {
    return new Promise((resolve, reject) => {
      fs.promises.writeFile(ruta, JSON.stringify(contenido, null, 2), 'utf-8')
        .then(resolve)
        .catch(error => {
          console.log('😱 Ocurrio un error durante la escritura:', error)
          reject(error)
        })
    })
  }

  escribirJSON('./os-promise.json', os)
    .then(() => leerJSON('./os-promise.json'))
    .then((data) => {
      console.log('Data recuperada desde el archivo:\n', data)
      console.log('Agregaremos un elemento más...')
      data.push({
        nombre: 'Chromium OS',
        tipo: 'abierto',
        empresa: 'Open Source',
      })
      return escribirJSON('./os-promise.json', data)
    })
    .then(() => {
      console.log('Listo, puedes verlo en el archivo...')
    })
    .catch(error => {
      console.log('😱 Ocurrio un error durante la operación:', error)
    })

})(false);

(async function (run) {
  if (!run) return

  console.log('⭐ Ejercicio con async await')

  async function leerJSON(ruta) {
    try {
      const contenido = await fs.promises.readFile(ruta, 'utf-8')
      return JSON.parse(contenido)
    } catch (error) {
      console.log('😱 Ocurrio un error durante la lectura:', error)
      throw new Error(error.message)
    }
  }
  
  async function escribirJSON(ruta, contenido) {
    try {
      await fs.promises.writeFile(ruta, JSON.stringify(contenido, null, 2), 'utf-8')
    } catch (error) {
      console.log('😱 Ocurrio un error durante la escritura:', error)
      throw new Error(error.message)
    }
  }

  try {
    await escribirJSON('./os-async-await.json', os)
    const data = await leerJSON('./os-async-await.json')
    console.log('Data recuperada desde el archivo:\n', data)
    console.log('Agregaremos un elemento más...')
    data.push({
      nombre: 'Chromium OS',
      tipo: 'abierto',
      empresa: 'Open Source',
    })
    await escribirJSON('./os-async-await.json', data)
    console.log('Listo, puedes verlo en el archivo...')
  } catch (error) {
    console.log('😱 Ocurrio un error durante la operación:', error)
    throw new Error(error.message)
  }

})(true);
