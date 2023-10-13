(function () {
    let username;
    const socket = io();

    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const logMessages = document.getElementById('log-messages');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = inputMessage.value;
        socket.emit('new-message', { username, text });
        inputMessage.value = '';
        inputMessage.focus();
    });

    function updateLogMessages(messages) {
        logMessages.innerText = '';
        messages.forEach(({ msg }) => {
            const p = document.createElement('p');
            p.innerText = `${msg.username}: ${msg.text}`;
            logMessages.appendChild(p);
        });
    }

    socket.on("notification", (messages) => {
        updateLogMessages(messages);
    })

    socket.on("new-client", () => {
        Swal.fire({
            text: 'Nuevo usuario conectado',
            toast: true,
            position: 'top-right',
        })
    })

    Swal.fire({
        title: 'Welcome to the chat!',
        input: 'text',
        inputLabel: 'Enter your name',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        },

    })


})()