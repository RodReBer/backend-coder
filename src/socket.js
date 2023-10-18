import { Server } from 'socket.io';
import ProductManager from "./classes/productManager.js";
import path from 'path';
import { __dirname } from './utils.js';

let io;

const PM = new ProductManager(path.join(__dirname, './data/products.json'));
const products = await PM.getProducts();

const messages = [];

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', (socketClient) => {
        console.log(`New connection ${socketClient.id}`);

        socketClient.emit('products', products);

        socketClient.broadcast.emit('new-client');

        socketClient.on('userConection', (data) => {
            messages.push({
                id: socketClient.id,
                name: data.user,
                message: `${data.user} Conectado`,
                date: new Date().toTimeString(),
            })
            io.sockets.emit("userConection", messages);
        });
    });
}


export const emitData = (event, data) => io.emit(event, data);