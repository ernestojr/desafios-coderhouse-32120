(async function () {

  console.log('⭐ Ejercicio modulos locales')

  const files = require('./files')
  
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

  try {
    await files.escribirJSON('./os.json', os)
    const data = await files.leerJSON('./os.json')
    console.log('Data recuperada desde el archivo:\n', data)
    console.log('Agregaremos un elemento más...')
    data.push({
      nombre: 'Chromium OS',
      tipo: 'abierto',
      empresa: 'Open Source',
    })
    await files.escribirJSON('./os.json', data)
    console.log('Listo, puedes verlo en el archivo...')
  } catch (error) {
    console.log('😱 Ocurrio un error durante la operación:', error)
    throw new Error(error.message)
  }

})();