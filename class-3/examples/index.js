(function (run) {
  if (!run) return
  // Funciones Flecha

  // Función tradicional
  function sumar(a, b) {
    return a + b
  }
  // Función Flecha
  const restar = (a, b) => {
    return a - b
  }
  // Función Flecha de una sola instrucción
  const multiplicar = (a, b) => a * b

  // Función Flecha de una sola instrucción con un solo parámetro
  const saludar = nombre => console.log(`Hola ${nombre}, Se bienvenido a esta clase 🚀.`)

  const A = 56
  const B = 31

  console.log(`El resultado de la suma de ${A} + ${B} es ${sumar(A, B)} 😍`)
  console.log(`El resultado de la resta de ${A} - ${B} es ${restar(A, B)} 😍`)
  console.log(`El resultado de la multiplicación de ${A} * ${B} es ${multiplicar(A, B)} 😍`)
  saludar('Ignacio')

})(false);

(function (run) {
  if (!run) return
  // Ejecución Sincrónica
  const funcAux = require('./aux-functions')

  const obtFechaHoraActual = funcAux.obtFechaHoraActual

  const enviarMensajeSincrono = funcAux.enviarMensajeSincrono

  console.log(`${obtFechaHoraActual()} ⭐ Iniciaremos el procedimeinto de envio del mensaje...`)

  enviarMensajeSincrono('Hola Manuel, Cómo te va con las clases del curso de backend?')

  console.log(`${obtFechaHoraActual()} ⭐ Finalizamos el procedimeinto de envio del mensaje.`)

})(false);

(function (run) {
  if (!run) return
  // Ejecución Asincrónica
  const funcAux = require('./aux-functions')

  const obtFechaHoraActual = funcAux.obtFechaHoraActual

  const enviarMensajeAsincrono = funcAux.enviarMensajeAsincrono

  console.log(`${obtFechaHoraActual()} ⭐ Iniciaremos el procedimeinto de envio del mensaje...`)

  enviarMensajeAsincrono('Hola Manuel, Cómo te va con las clases del curso de backend?')

  console.log(`${obtFechaHoraActual()} ⭐ Finalizamos el procedimeinto de envio del mensaje.`)

})(false);

(function (run) {
  if (!run) return
  // Callbacks

  const sumar = (a, b) => a + b
  const restar = (a, b) => a - b
  const multiplicar = (a, b) => a * b
  const dividir = (a, b) => a / b
  const resultado = {
    totalSuma: 0,
    totalResta: 0,
    totalMulti: 0,
    totalDiv: 0,
  }

  const ejecutarOperacion = (a, b, ope) => {
    console.log(`Ejecutando una nueva operación con los valores ${a} y ${b}...`)
    return ope(a, b)
  }

  resultado.total = ejecutarOperacion(2, 3, sumar)
  resultado.totalResta = ejecutarOperacion(4, 3, restar)
  resultado.totalMulti = ejecutarOperacion(3, 3, multiplicar)
  resultado.totalDiv = ejecutarOperacion(12, 3, dividir)

  console.log(resultado)
  
})(false);

(function (run) {
  if (!run) return
  // setTimeout
  const funcAux = require('./aux-functions')

  const obtFechaHoraActual = funcAux.obtFechaHoraActual

  const enviarMensajeAsincrono = funcAux.enviarMensajeAsincrono

  console.log(`${obtFechaHoraActual()} ⭐ Inicio del HILO PRINCIPAL...`)

  enviarMensajeAsincrono('Hola Manuel, Cómo te va con las clases del curso de backend?')

  console.log(`${obtFechaHoraActual()} ⭐ Final del HILO PRINCIPAL.`)
  
})(false);

(function (run) {
  if (!run) return
  // SetInterval

  const cuentaRegresiva = (inicio) => {
    let contador = inicio
    console.log('Iniciamos la cuenta regresiva para el lanzamiento...⏳');
    const idIntervalo = setInterval(() => {
      console.log(`⌚ ${contador}`)
      if (contador <= 0) {
        clearInterval(idIntervalo)
        console.log('Lanzamiento... 🚀')
      }
      contador--
    }, 1000)
  }
 
  cuentaRegresiva(10);

})(false);


(function (run) {
  if (!run) return
  // Callback convenciones

  const callback = (error, resultado) => {
    if (error) {
      console.error(`😱 Ha ocurrido un error: ${error}`);
    } else {
      console.log(`🚀 El resultado de la división es ${resultado}.`);
    }
  }

  const division = (dividendo, divisor, callback) => {
    if (divisor === 0) {
      callback('La división por cero es una <<indefinición>>')
    } else {
      const resultado = dividendo / divisor
      callback(null, resultado)
    }
  }

  division(18, 6, callback)
  division(3, 0, callback)

})(false);

(function (run) {
  if (!run) return
  // Promesas

  const callbackExito = (resultado) => {
    console.log(`🚀 El resultado de la división es ${resultado}.`);
  }

  const callbackFallo = (error) => {
    console.error(`😱 Ha ocurrido un error: ${error}`);
  }

  const division = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
      if (divisor === 0) {
        reject('La división por cero es una <<indefinición>>')
      } else {
        const resultado = dividendo / divisor
        resolve(resultado)
      }
    })
  }

  division(18, 6)
    .then(callbackExito)
    .catch(callbackFallo)

  division(3, 0)
    .then(callbackExito)
    .catch(callbackFallo)

})(false);


(function (run) {
  if (!run) return
  // Otro de Promesas

  const cuentaRegresiva = (inicio) => {
    return new Promise((resolve) => {
      let contador = inicio
      let idIntervalo
      console.log('Iniciamos la cuenta regresiva para el lanzamiento...⏳');
      idIntervalo = setInterval(() => {
        console.log(`⌚ ${contador}`)
        if (contador <= 0) {
          clearInterval(idIntervalo)
          resolve()
        }
        contador--
      }, 1000)
    })
    
  }
 
  cuentaRegresiva(5)
    .then(() => console.log('Lanzamiento... 🚀'))

})(false);

(function (run) {
  if (!run) return
  // Encadenamiento de  Promesas

  const funcAux = require('./aux-functions')

  const obtFechaHoraActual = funcAux.obtFechaHoraActual

  new Promise((resolve) => {
    console.log(`${obtFechaHoraActual()} 🛒 Intentando reservar los artículos.`);
    setTimeout(() => {
      console.log(`${obtFechaHoraActual()} 🛒 Reservación de artículos éxitosa.`);
      resolve()
    }, 1000)
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log(`${obtFechaHoraActual()} 💸 Ejecutando pago de artículos.`);
      setTimeout(() => {
        // return reject('Error durante el pago 💔...')
        console.log(`${obtFechaHoraActual()} 💸 Ejecutado pago del artículos con éxitosa.`);
        resolve()
      }, 1000)
    })
  })
  .then(() => {
    return new Promise((resolve) => {
      console.log(`${obtFechaHoraActual()} 👁‍🗨 Notificando a los proveedores de los artículos.`);
      setTimeout(() => {
        console.log(`${obtFechaHoraActual()} 👁‍🗨 Notificación a proveedores éxitosa.`);
        resolve()
      }, 1000)
    })
  })
  .then(() => {
    return new Promise((resolve) => {
      console.log(`${obtFechaHoraActual()} 📧 Enviando correo de compra al usuario.`);
      setTimeout(() => {
        console.log(`${obtFechaHoraActual()} 📧 Enviado correo de compra al usuario.`);
        resolve()
      }, 1000)
    })
  })
  .then(() => {
    return new Promise((resolve) => {
      console.log(`${obtFechaHoraActual()} 🛒 Removiendo artículos del carrito de compras.`);
      setTimeout(() => {
        console.log(`${obtFechaHoraActual()} 🛒 Carrito de compras vacio.`);
        resolve()
      }, 1000)
    })
  })
  .then(() => console.log(`${obtFechaHoraActual()} ✨ Compra completada con éxito.`))
  .catch(error => console.log(`${obtFechaHoraActual()} 😱 Ha ocurrido un error: ${error}`))

})(true);

