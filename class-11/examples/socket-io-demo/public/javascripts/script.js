(function () {
  localStorage.debug = '*';
  const idCliente = Date.now();
  const messages = document.getElementById('messages');
  const messageInput = document.getElementById('message');
  const form = document.getElementById('message-form');
  
  const socket = io({
    path: '/websocket/',
    query: `idCliente=${idCliente}`,
  });

  socket.on('connect', () => {
    console.log('Conectado al servidor');
    console.log('Id Cliente', idCliente);
  });

  socket.on('evento-prueba', (mensaje) => {
    console.log('Nuevo mensaje', mensaje);
    const item = document.createElement('li');
    item.textContent = mensaje;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('evento-prueba', messageInput.value);
    messageInput.value = '';
    messageInput.focus();
  });
})();