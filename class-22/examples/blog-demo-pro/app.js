import { schema, normalize, denormalize } from 'normalizr'
import util from 'util'

const data = {
  id: "999",
  posts: [
    {
      id: "123",
      author: {
        id: "1",
        nombre: "Pablo",
        apellido: "Perez",
        DNI: "20442654",
        direccion: "CABA 123",
        telefono: "1567876547"
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543"
          }
        },
        {
          id: "325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542"
          }
        }
      ]
    },
    {
      id: "1123",
      author: {
        id: "2",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543"
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "1324",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547"
          }
        },
        {
          id: "1325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542"
          }
        }
      ]
    },
    {
      id: "2123",
      author: {
        id: "3",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20446938",
        direccion: "CABA 789",
        telefono: "1567291542"
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "2324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543"
          }
        },
        {
          id: "2325",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547"
          }
        }
      ]
    }
  ]
}

const userScheme = new schema.Entity('users')

const commentScheme = new schema.Entity('comments', {
  commenter: userScheme
})

const postScheme = new schema.Entity('posts', {
  author: userScheme,
  comments: [commentScheme]
})

const blogScheme = new schema.Entity('blogs', {
  posts: [postScheme]
})

function print(object) {
  console.log(util.inspect(object, false, 14, true));
}

console.log('--------------------------------------------------------------------');

console.log('Data Original', JSON.stringify(data).length)

print(data)

console.log('--------------------------------------------------------------------');

const dataNormalized = normalize(data, blogScheme)

console.log('Data Normalized', JSON.stringify(dataNormalized).length)

print(dataNormalized)

console.log('--------------------------------------------------------------------');

const dataReversed = denormalize(dataNormalized.result, blogScheme, dataNormalized.entities)

console.log('Data Reversed', JSON.stringify(dataReversed).length)

print(dataReversed)
