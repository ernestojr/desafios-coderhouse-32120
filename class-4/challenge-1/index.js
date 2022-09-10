(function (run) {
  if (!run) return

  console.log('⭐ [Callback & Promises] Desafio geneneral #01')
  
  function mostrarLetras(texto, cb) {
    let position = 0
    const intervalId = setInterval(() => {
      if (position >= texto.length) {
        clearInterval(intervalId)
        cb()
        return
      }
      console.log(texto[position]);
      position++
    }, 1000)
  }

  const fin = () => console.log('Terminé')

  mostrarLetras('¡Hola!', fin)

  setTimeout(() => {
    mostrarLetras('¡Hola!', fin)
  }, 250)

  setTimeout(() => {
    mostrarLetras('¡Hola!', fin)
  }, 500)
})(true);