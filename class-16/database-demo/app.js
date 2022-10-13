import {
  createTable,
  insertProducts,
  getProducts,
  updateProducts,
  deleteProducts,
} from './db/index.js'

const products = [
  {
    nombre: 'Tv',
    codigo: '1234',
    precio: 234.98,
    stock: 23,
  },
  {
    nombre: 'Cocina',
    codigo: '4321',
    precio: 456.68,
    stock: 13,
  },
  {
    nombre: 'Licuadora',
    codigo: '4356345',
    precio: 123.58,
    stock: 20,
  },
  {
    nombre: 'Plancha',
    codigo: '6743',
    precio: 113.58,
    stock: 30,
  },
]

try {
  await createTable()
  await deleteProducts()
  await insertProducts(products)
  let rows = await getProducts()
  rows.forEach(row => console.log(JSON.stringify(row)))
  await updateProducts({ stock: 0 }, { codigo: '4321' })
  await deleteProducts({ codigo: '4356345'})
  rows = await getProducts()
  rows.forEach(row => console.log(JSON.stringify(row)))
} catch (error) {
  console.error(error.message)
}
