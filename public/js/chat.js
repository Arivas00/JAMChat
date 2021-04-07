
    const socket = io();

    const messages = document.getElementById('messages');
    const form = document.getElementById('form');
    const input = document.getElementById('input');


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);

            input.value = '';
        }
    });

    socket.on('chat message', function (msg) {
        let username = localStorage.getItem("username")
        let item = document.createElement('li');
        item.innerHTML = "<b>" + username + ": " + "</b>" + msg;
        messages.appendChild(item);
       
        window.scrollTo(0, document.body.scrollHeight);
    });
