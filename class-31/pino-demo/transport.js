import { createWriteStream } from 'fs'

export default (options) => {
  return createWriteStream(options.destination)
}