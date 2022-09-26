(function () {
  let messages = []
  const inputMessage = document.getElementById('input-message');
  const formMessage = document.getElementById('message-form');
  const socket = io();

  function updateListMessages(mensajes) {
    const showMessages = document.getElementById('show-messages');
    showMessages.innerText = '';
    mensajes.map((mensaje) => {
      const item = document.createElement('li');
      item.textContent = `Socketid: ${mensaje.socketid} -> Mensaje: ${mensaje.mensaje}`;
      showMessages.appendChild(item);
    })
  }

  socket.on('connect', () => {
    console.log('Conectado al servidor');
  });

  socket.on('mensajes-servidor', (mensajesHistorico) => {
    console.log('mensajes', mensajesHistorico);
    messages = mensajesHistorico;
    updateListMessages(messages);
  });

  socket.on('nuevo-mensaje', (msg) => {
    console.log('Nuevo mensaje del servidor', msg);
    messages.push(msg);
    updateListMessages(messages);
  });

  /* inputMessage.addEventListener('keyup', (event) => {
    socket.emit('mensaje', event.target.value)
  }) */

  formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('servidor-evento', inputMessage.value)
    inputMessage.value = '';
    inputMessage.focus();
  });
})();