import { schema, normalize, denormalize } from 'normalizr'
import util from 'util'

const blog = {
  id: '1',
  title: 'My blog post',
  description: 'Short blogpost description',
  content: 'Hello world',
  author: {
    id: '4',
    name: 'John Doe'
  },
  comments: [
    {
      id: '1',
      author: 'Rob',
      content: 'Nice post!'
    },
    {
      id: '2',
      author: 'Jane',
      content: 'I totally agree with you!'
    }
  ]
}

const autorScheme = new schema.Entity('authors')

const commentScheme = new schema.Entity('comments')

const postScheme = new schema.Entity('posts', {
  author: autorScheme,
  comments: [commentScheme]
})

function print(object) {
  console.log(util.inspect(object, false, 14, true));
}

console.log('--------------------------------------------------------------------');

console.log('Data Original', JSON.stringify(blog).length)

print(blog)

console.log('--------------------------------------------------------------------');

const dataNormalized = normalize(blog, postScheme)

console.log('Data Normalized', JSON.stringify(dataNormalized).length)

print(dataNormalized)

console.log('--------------------------------------------------------------------');

const dataReversed = denormalize(dataNormalized.result, postScheme, dataNormalized.entities)

console.log('Data Reversed', JSON.stringify(dataReversed).length)

print(dataReversed)
