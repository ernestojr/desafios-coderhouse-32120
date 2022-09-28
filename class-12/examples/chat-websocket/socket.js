const { Server } = require('socket.io')

let io
let messages = [
  {
    id: 1,
    name: 'Ernesto Rojas',
    message: 'Hola!',
  },
]

class Socket {
  static init(httpServer) {
    io = new Server(httpServer)
    io.on('connection', (clientSocket) => {
      console.log('Nuevo cliente conectado', clientSocket.id)

      clientSocket.emit('history-messages', messages)

      clientSocket.on('new-message', (data) => {
        const content = {
          id: clientSocket.id,
          name: data.name,
          message: data.message,
        }
        messages.push(content)
        io.emit('notification', content)
      })

      clientSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

module.exports = Socket