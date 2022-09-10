(function (run) {
  if (!run) return

  console.log('🤓 Funciones flecha objeto this y objeto arguments');

  const calculadora = {
    mostrarEnunciado: function(a, b, ope, cb) {
      console.log('----------------------------------------------------------')
      console.log('🧮 Realizaremos la operación de', ope, 'entre', a, 'y', b, '...')
      cb()
    },
    mostrarResultado: function (resultado, ope) {
      console.log('🧮 El resultado de la', ope, 'es', resultado, '!')
    },
    sumar: function (a, b) { // Esta función tiene un problema que veremos en clase 😉
      const ope = 'suma'
      this.mostrarEnunciado(a, b, ope, function () {
        const resultado = a + b
        this.mostrarResultado(resultado, ope)
      })
    },
    restar: function (a, b) {
      const ope = 'resta'
      const self = this
      this.mostrarEnunciado(a, b, ope, function () {
        const resultado = a - b
        self.mostrarResultado(resultado, ope)
      })
    },
    multiplicar: function (a, b) {
      const ope = 'multiplición'
      this.mostrarEnunciado(a, b, ope, () => {
        const resultado = a * b
        this.mostrarResultado(resultado, ope)
      })
    },
    dividir: function () {
      const ope = 'división'
      const a = arguments[0]
      const b = arguments[1]
      this.mostrarEnunciado(a, b, ope, () => {
        const resultado = a / b
        this.mostrarResultado(resultado, ope)
      })
    },
    sumarArgumentosLibres: function () {
      const args = Array.from(arguments)
      const ope = 'suma'
      console.log('----------------------------------------------------------')
      console.log('🧮 Realizaremos la suma de los valores', args.join(','))
      let resultado = 0
      args.forEach(argument => {
        resultado += argument
      })
      this.mostrarResultado(resultado, ope)
    },
  }

  //calculadora.sumar(2, 6)
  calculadora.restar(10, 2)
  calculadora.multiplicar(4, 2)
  calculadora.dividir(16, 2)
  calculadora.sumarArgumentosLibres(2, 4, 6, 8)

})(true);

(function (run) {
  if (!run) return

  console.log('🤓 Callbacks');

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

  console.log('🤓 Promesas');

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

  console.log('🤓 setTimeout');

  const recuerdame = (recordatorio, segundos) => new Promise(resolve => {
    const milisegundos = segundos * 1000
    console.log(`⏲ Estableciendo recordatorio.`);
    setTimeout(() => {
      console.log(`⏲ Recordatorio: ${recordatorio}.`);
      resolve()
    }, milisegundos)
    console.log(`⏲ Recordatorio establecido con éxito.`);
  })
  const recordatorio = 'Debo repasar la clase anterior 💻.'
  recuerdame(recordatorio, 5)

})(false);

(function (run) {
  if (!run) return
  // setInterval

  console.log('🤓 setInterval');

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