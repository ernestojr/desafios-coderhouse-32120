(function () {
  const formMessage = document.getElementById('form-message');
  const inputFullname= document.getElementById('input-fullname');
  const inputMessage = document.getElementById('input-message');
  const listMessages = document.getElementById('list-messages');
  
  let messages = [];

  const socket = io();

  function showMessage(data) {
    const li = document.createElement('li');
    li.innerHTML = `<p><strong>${data.fullname}</strong>: ${data.message}</p>`;
    listMessages.appendChild(li);
  }

  formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      fullname: inputFullname.value,
      message: inputMessage.value,
    };
    socket.emit('new-message', data);
    inputMessage.value = '';
    inputMessage.focus();
  });

  socket.on('connect', () => {
    console.log('Conectados al servidor');
  });

  socket.on('history-messages', (data) => {
    messages = data;
    listMessages.innerText = '';
    messages.forEach((message) => {
      showMessage(message)
    })
  });

  socket.on('notification', (data) => {
    messages.push(data);
    showMessage(data);
  });
  
})();
