(function (run) {
  if (!run) return

  const numeros = {}

  const generador = (inicio, fin) => Math.floor(Math.random() * (fin - inicio + 1) + inicio)

  for (let i = 0; i <= 10000; i++) {
    const num = generador(0, 20)
    if (!numeros[num]) {
      numeros[num] = 0
    }
    numeros[num] = numeros[num] + 1
  }

  console.log('Resultado:\n', numeros)

})(false);

(function (run) {
  if (!run) return

  const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
  ]

  function obtNombres(data) {
    return data.map(prod => prod.nombre)
  }

  function obtTotal(data) {
    const total = data.reduce((result, prod) => (result += prod.precio), 0)
    return total
  }

  function obtPromedio(data) {
    const total = obtTotal(data)
    const promedio = total / data.length
    return promedio
  }

  function obtMenor(data) {
    let menor = Number.MAX_SAFE_INTEGER
    let posicion = 0
    data.map((prod, indice) => {
      if (prod.precio < menor) {
        posicion = indice
        menor = prod.precio
      }
    })
    return data[posicion]
  }

  function obtMayor(data) {
    let mayor = 0
    let posicion = 0
    data.map((prod, indice) => {
      if (prod.precio > mayor) {
        posicion = indice
        mayor = prod.precio
      }
    })
    return data[posicion]
  }

  const resultado = {
    productos: obtNombres(productos),
    total: Number(obtTotal(productos).toFixed(2)),
    promedio:Number( obtPromedio(productos).toFixed(2)),
    menor: obtMenor(productos),
    mayor: obtMayor(productos),
  }

  console.log('resultado:\n', resultado)

})(true);
