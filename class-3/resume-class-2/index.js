(function (run) {
  if (!run) return
  // Funciones, Scope y Closure

  console.log('# Funciones, Scope y Closure 😎');

  function sumar(a, b) {
    return a + b;
  }

  function restar(a, b) {
    return a - b;
  }

  function saludar(nombre) {
    console.log('Hola 🖐', nombre, ', cómo estás?')
  }

  function crearOperacion(operacion) {
    return function (a, b) {
      if (operacion === '+') {
        let resultado = sumar(a, b)
        console.log('El resultado de la suma es :' + resultado + '🎈')
      } else if (operacion === '-') {
        let resultado = restar(a, b)
        console.log('El resultado de la resta es :' + resultado + '🎀')
      } else {
        console.log('Operacion invalida.')
      }
    }
  }

  saludar('Patricio')
  const opeSuma = crearOperacion('+')
  opeSuma(22, 34)

  const opeResta = crearOperacion('-')
  opeResta(43, 22)

})(true);

(function (run) {
  if (!run) return
  // Template String
  console.log('# Template String 😎');

  function saludar(nombre, pais) {
    const mensaje = `
    Hola ${nombre} 🖐.
    ¿Cómo estás 😉?
    ¿Qué tal está ${pais} 😍?`
    console.log(mensaje)
  }

  saludar('Cristian', 'Chile')

})(true);

(function (run) {
  if (!run) return
  // Clases y el operador new
  console.log('# Clases y el operador new 😎');

  class Articulo {
    static totalArticulos = 0
    constructor (codigo, nombre, proveedor, cantidad) {
      this.codigo = codigo
      this.nombre = nombre
      this.proveedor = proveedor
      this.cantidad = cantidad
      Articulo.totalArticulos++
    }

    obtNombre() {
      return this.nombre
    }

    comprar(cantidadComprada) {
      this.cantidad -= cantidadComprada
    }

    reponer(cantidadAgregada) {
      this.cantidad += cantidadAgregada
    }

    cambiarProveedor(proveedor) {
      this.proveedor = proveedor
    }

    obtInfo() {
      const info = `
      -----------------------
      Codigo: ${this.codigo}
      Nombre: ${this.nombre}
      Proveedor: ${this.proveedor}
      Cantidad: ${this.cantidad}
      -----------------------`
      console.log(info)
    }
  }

  const articulo1 = new Articulo('1', 'Arroz 1Kg', 'Mi campo 🍚', 100)
  const articulo2 = new Articulo('2', 'Trigo 1Kg', 'Mi campo 🍞', 100)
  const articulo3 = new Articulo('3', 'Azúcar 1Kg', 'Mi cañaveral 🍬', 100)
  
  console.log(`En la tiene vendemos ${Articulo.totalArticulos} artículos, acá su información:`)

  articulo1.obtInfo()
  articulo2.obtInfo()
  articulo3.obtInfo()

  articulo3.comprar(10)
  articulo3.cambiarProveedor('El cañaveral de otro 😂')
  articulo3.reponer(20)

  console.log(`El artículo ${articulo3.obtNombre()} ha sufrido cambios:`)

  articulo3.obtInfo()

})(true);