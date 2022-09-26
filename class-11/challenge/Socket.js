const { Server } = require('socket.io')

let io

const mensajes = []

class Socket {
  static init(httpServer) {
    io = new Server(httpServer)
    io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado - ID:', socket.id)

      socket.emit('mensajes-servidor', mensajes)

      socket.on('servidor-evento', (mensaje) => {
        console.log('Nuevo mensaje desde el cliente', socket.id, mensaje)
        const data = { socketid: socket.id, mensaje }
        mensajes.push(data)
        io.emit('nuevo-mensaje', data)
      })

      socket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

module.exports = Socket