import winston from 'winston'

let logger // Levels: Silly, Debug, Verbose, Info, Warn, Error

if (process.env.NODE_ENV === 'prod') {
  logger = winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ]
  })
} else {
  logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({ level: 'info' }),
    ]
  })
}

export default logger