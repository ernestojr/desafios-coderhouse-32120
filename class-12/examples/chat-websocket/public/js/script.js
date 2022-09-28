(function () {

  const formMessage = document.getElementById('form-message');
  const inputMessage = document.getElementById('input-message');
  const inputName= document.getElementById('input-name');
  const listMessage = document.getElementById('list-message');

  let messages = [];
  const socket = io();

  function addMessage(data) {
    const li = document.createElement('li');
    li.innerHTML = `<p><strong>${data.name}</strong>: ${data.message}</p>`;
    listMessage.appendChild(li);
  }

  formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('new-message', {
      name: inputName.value,
      message: inputMessage.value,
    });
    inputMessage.value = '';
    inputMessage.focus();
  })
  
  socket.on('connect', () => {
    console.log('Connected to socket server.');
  });

  socket.on('history-messages', (data) => {
    messages = data;
    messages.forEach(addMessage);
  });

  socket.on('notification', (data) => {
    addMessage(data);
  });

})();