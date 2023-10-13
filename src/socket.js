import { server } from 'socket.io';

let io;

let messages = [];

export const init = (httpServer) => {
    io = new server(httpServer);

    io.on('connection', (socketClient) => {
        console.log(`New connection ${socketClient.id}`);

        socketClient.emit('log-messages', { messages });

        socketClient.broadcast.emit('new-client');

        socketClient.on('new-message', (data) => {
            const { username, text } = data;
            messages.push({ username, text });
            io.emit('notification', { messages });
        });
    });
}