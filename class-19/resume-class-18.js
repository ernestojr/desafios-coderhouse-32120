mongod --dbpath "C:\MongoDB\data\db"

mongosh

use admin

db.createUser({
  user: 'userBI',
  pwd: '123456',
  roles: [
    {
      role: 'read',
      db: 'ecommerce',
    },
  ]
})

db.createUser({
  user: 'userDeveloper',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'ecommerce',
    },
  ]
})

mongod --auth --dbpath "C:\MongoDB\data\db"

// Business Intelligence

mongosh -u 'userBI' -p '123456'

use ecommerce

db.users.insertOne({
  nombre: 'Ikram',
  apellido: 'Segui',
  edad: 38,
  telefono: '56900000008',
  correo: 'ikram_segui@correo.com',
  estado: 'activo',
  create_time: new Date(),
});

// Developer

mongosh -u 'userDeveloper' -p '123456'

use ecommerce

db.users.insertMany([
  {
    nombre: 'María',
    apellido: 'Rojas',
    edad: 21,
    telefono: '56900000001',
    correo: 'mariarojas@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
  {
    nombre: 'Carlos',
    apellido: 'Gómez',
    edad: 30,
    telefono: '56900000002',
    correo: 'carlosgomez@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
  {
    nombre: 'Adrian',
    apellido: 'López',
    edad: 44,
    telefono: '56900000003',
    correo: 'adrianlopez@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
  {
    nombre: 'Ana',
    apellido: 'Guerra',
    edad: 19,
    telefono: '56900000004',
    correo: 'anaguerra@mail.com',
    estado: 'activo',
    create_time: new Date(),
  },
]);

db.changeUserPassword('userDeveloper', passwordPrompt())

mongosh -u 'userDeveloper' -p 'SOh3TbYhx8ypJPxmt1oOfL'

db.users.countDocuments();

db.users.find({});

db.users.find({}).sort({ edad: -1 });

db.users.find({}).sort({ edad: -1 }).skip(1);

db.users.find({}).sort({ edad: -1 }).limit(2);

db.users.find({}).sort({ edad: -1 }).skip(1).limit(2);
