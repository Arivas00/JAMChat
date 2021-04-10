const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let username = '';
  if (input.value) {
    fetch('/user')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        username = data.username;
        socket.emit('chat message', input.value, username);
        input.value = '';
      });
  }
});

socket.on('chat message', function (msg, username) {
  let item = document.createElement('li');
  item.innerHTML = '<b>' + username + ': ' + '</b>' + msg;
  messages.appendChild(item);

  window.scrollTo(0, document.body.scrollHeight);
});
