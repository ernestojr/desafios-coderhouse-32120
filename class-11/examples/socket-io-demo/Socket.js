const { Server } = require('socket.io')

let io

class Socket {
  static init(server) {
    io = new Server(server, { path: '/websocket/' })
    io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado')
      //console.log('socket.handshake', socket.handshake)
      const { idCliente } = socket.handshake.query
      console.log('idCliente', idCliente)
      socket.join(idCliente)
      socket.on('evento-prueba', (msg) => {
        console.log('Nuevo mensaje: ' + msg)
        Socket.emit(idCliente, 'evento-prueba', 'Hola')
      })
      socket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }

  static emit(idCliente, evento, data) {
    io.to(idCliente).emit(evento, data)
  }
}

module.exports = Socket