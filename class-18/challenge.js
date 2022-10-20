// O1

use empresa

db.createCollection('clientes');

show collections

db.clientes.insertOne({ nombre: 'Jose', edad: 55 });

db.clientes.insertMany([
  { nombre: 'Patricia', edad: 30 },
  { nombre: 'Maria', edad: 24 },
  { nombre: 'Jesus', edad: 33 },
]);

db.articulos.insertMany([
  { nombre: 'Camisa', precio: 20000.00, stock: 30 },
  { nombre: 'Pantalon', precio: 50000.00, stock: 26 },
  { nombre: 'Reloj', precio: 60000.00, stock: 15 },
]);

show collections

db.clientes.find();

db.articulos.find();

db.articulos.countDocuments();

// 02

db.clientes.insertMany([
  { nombre : 'Pablo', edad : 25 },
  { nombre : 'Juan', edad : 22 },
  { nombre : 'Lucia', edad : 25 },
  { nombre : 'Juan', edad : 29 },
  { nombre : 'Fede', edad : 35 },
]);

db.clientes.find({}).sort({ edad: -1 });

db.clientes.find({ edad: { $lt: 30 } });

db.clientes.find({ nombre: 'Juan' });

db.clientes.find({ nombre: 'Juan', edad: 29 });

db.clientes.find({ $or: [{ nombre: 'Juan' }, { nombre: 'Lucia' }]});

db.clientes.find({ edad: { $gt: 25 } });

db.clientes.find({ edad: { $lte: 25 } });

db.clientes.find({ edad: { $ne: 25 } });

db.clientes.find({ $and: [{ edad: { $gte: 26 } }, { edad: { $lte: 35 } }] });

db.clientes.updateOne({ nombre : 'Fede' }, { $inc: { edad: 1 } });

db.clientes.find({ $and: [{ edad: { $gte: 26 } }, { edad: { $lte: 35 } }] });

db.clientes.updateMany({ edad : 25 }, { $inc: { edad: 1 } });

db.clientes.find({ $and: [{ edad: { $gte: 26 } }, { edad: { $lte: 35 } }] });

db.clientes.deleteMany({ nombre: 'Juan' });

db.clientes.find({}).sort({ edad: -1 });

// 03

use admin

db.createUser({
  user: 'encargado',
  pwd: 'qwerty123',
  roles: [
    { role: 'readWrite', db: 'empresa' },
  ]
})

db.system.users.find()

// cerramos la conección y habilitamos el auth en mongod e ingresamos con user y pwd

mongosh -u "encargado". -p "qwerty123"

use empresa

db.clientes.find({}, { nombre: 1, _id: 0 });

// cerramos la conección y e ingresamos con user y pwd incorrecto

mongosh -u "encargado" -p "qwerty456"