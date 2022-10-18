show databases;

use sistema;

show collections;

db.usuarios.insertOne({ nombre: 'Emílio Baez', edad: 31 });

db.usuarios.find({});

db.usuarios.insertMany([
  { nombre: 'Isidoro Rosado', edad: 23 },
  { nombre: 'Gabriel Bermejo', edad: 32 },
  { nombre: '', edad: 19 },
  { nombre: 'Desiree Coll', edad: 22 },
]);

db.usuarios.findOne({ edad: 22 });

db.usuarios.find({ edad: { $gte: 30 } });

db.usuarios.find({ edad: { $lte: 30 } });

db.usuarios.find({ nombre: { $in: ['Gabriel Bermejo', 'Stefan de Los Santos'] } });

show collections;

db.productos.insertMany([
  {
    nombre: 'TV',
    precio: 234.99,
    stock: 32,
  },
  {
    nombre: 'Nevera',
    precio: 564.99,
    stock: 20,
  },
  {
    nombre: 'Cocina',
    precio: 345.99,
    stock: 15,
  },
]);

db.productos.find({});

show collections;