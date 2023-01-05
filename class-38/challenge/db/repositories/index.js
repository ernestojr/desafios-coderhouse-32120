import file from './file.repository.js'
import memory from './memory.repository.js'
import mongo from './mongo.repository.js'

export function getRepository() {
  const typeRepository = process.env.TYPE_REPOSITORY || 'memory'
  switch (typeRepository) {
    case 'file':
      return file;
    case 'mongo':
      return mongo;
    default:
      return memory;
  }
}
