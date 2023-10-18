import { server } from 'socket.io';
import ProductManager from "./classes/productManager.js";
import path from 'path';
import { __dirname } from './utils.js';

let io;

const PM = new ProductManager(path.join(__dirname, './data/products.json'));
const products = await PM.getProducts();

export const init = (httpServer) => {
    io = new server(httpServer);

    io.on('connection', (socketClient) => {
        console.log(`New connection ${socketClient.id}`);

        socketClient.emit('products', products);

        // socketClient.broadcast.emit('new-client');

        // socketClient.on('new-message', (data) => {
        //     const { username, text } = data;
        //     messages.push({ username, text });
        //     io.emit('notification', { messages });
        // });
    });
}

export const emitData = (event, data) => io.emit(event, data);