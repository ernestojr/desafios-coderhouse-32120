(async function () {

  console.log('⭐ Ejercicio modulos nativos')

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
    await escribirJSON('./os.json', os)
    const data = await leerJSON('./os.json')
    console.log('Data recuperada desde el archivo:\n', data)
    console.log('Agregaremos un elemento más...')
    data.push({
      nombre: 'Chromium OS',
      tipo: 'abierto',
      empresa: 'Open Source',
    })
    await escribirJSON('./os.json', data)
    console.log('Listo, puedes verlo en el archivo...')
  } catch (error) {
    console.log('😱 Ocurrio un error durante la operación:', error)
    throw new Error(error.message)
  }

})();