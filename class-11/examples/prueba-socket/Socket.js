const { Server } = require('socket.io')

let io

const mensajes = [{
  socketID: '1234',
  mensaje: 'Coder House',
}]

class Socket {
  static init(httpServer) {
    console.log('Configurando el socket')
    io = new Server(httpServer)
    io.on('connection', (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id)

      clienteSocket.emit('inicio', mensajes)

      clienteSocket.on('nuevo-mensaje', (data) => {
        mensajes.push({ socketID: clienteSocket.id, mensaje: data })
        io.emit('notificacion', { socketID: clienteSocket.id, mensaje: data })
      })

      clienteSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

module.exports = Socket