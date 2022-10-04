const lista = ['Ernest', 'Jose', 'Juan', 'Pedro']

lista.map((nombre, index) => {
  return `${index + 1} ${nombre}`;
}).forEach(ele => {
  console.log(ele)
})