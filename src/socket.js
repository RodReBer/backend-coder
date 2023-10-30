import { Server } from 'socket.io';
import path from 'path';
import { __dirname } from './utils.js';
import ProductManager from "../src/dao/ProductManager.js";

let io;

const messages = [];

export const initSocket = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {

        console.log(`New connection ${socketClient.id}`);

        let productsBefore = await ProductManager.get();

        socketClient.emit('listProducts', productsBefore);

        socketClient.on("deleteProduct", async (id) => {
            await ProductManager.deleteById(id);
            let productsAfter = await ProductManager.get();
            io.sockets.emit("listProducts", productsAfter);
        });

        socketClient.on("addProduct", async (product) => {
            await ProductManager.create(product);
            let productsAfter = await ProductManager.get();
            io.sockets.emit("listProducts", productsAfter);
        });

        socketClient.on("disconnect", () => {
            console.log(`Disconnected ${socketClient.id}`);
        });

        socketClient.broadcast.emit('new-client');

        // socketClient.on('userConection', (data) => {
        //     messages.push({
        //         id: socketClient.id,
        //         name: data.user,
        //         message: `${data.user} Conectado`,
        //         date: new Date().toTimeString(),
        //     })
        //     io.sockets.emit("userConection", messages);
        // });
    });
}
