const { Server } = require('socket.io')

let io

let messages = [
  {
    fullname: 'Coder House',
    message: 'Bienvenidos'
  },
]

function initSocket(httpServer) {
  io = new Server(httpServer)
  setEvents(io)
}

function setEvents(io) {
  io.on('connection', (socketClient) => {
    console.log('Se conecto un nuevo cliente con el id', socketClient.id)
    socketClient.emit('history-messages', messages)
    socketClient.on('new-message', (data) => {
      messages.push(data)
      io.emit('notification', data)
    })
    socketClient.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socketClient.id)
    })
  })
}

function emit(event, data) {
  io.emit(event, data)
}

module.exports = {
  initSocket,
  emit,
}