(function (list) {
  if (list.length === 0) {
    return console.log('Lista vacia');
  }
  console.log('Contenido de la lista:', list);
})(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'])

function mostrarLista(list) {
  if (list.length === 0) {
    return console.log('Lista vacia');
  }
  console.log('Contenido de la lista:', list);
}

mostrarLista([1,2,3,4,5,6,7,8,9,0])
mostrarLista([])

function crearMultiplicador(a) {
  return function (b) {
    return a * b
  }
}

const multiplicador = crearMultiplicador(5);

console.log('Multiplicador', multiplicador(5))
console.log('Multiplicador', crearMultiplicador(5)(5))
