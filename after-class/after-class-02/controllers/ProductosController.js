const productos  = [{
  nombre: 'Tv',
  precio: 234.45,
  descripcion: 'Tv 55 pulgadas.',
  imagen: 'https://images.samsung.com/is/image/samsung/p6pim/cl/un55au7090gxzs/gallery/cl-uhd-au7002-un55au7090gxzs-531097757?$1300_1038_PNG$'
}]

class ProductosController {

  static crear(data) {
    console.log('body', data)
    productos.push(data)
    return data
  }
  static obtenerTodos(query ={}) {
    console.log('query', query)
    return productos
  }
  
  static obtenerPorId(id) {
    console.log('params.id', id)
    return productos[0]
  }
}

module.exports = ProductosController