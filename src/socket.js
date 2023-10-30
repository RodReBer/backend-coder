import { Server } from 'socket.io';
import ProductManager from "./classes/productManager.js";
import path from 'path';
import { __dirname } from './utils.js';

let io;

const PM = new ProductManager(path.join(__dirname, './data/products.json'));

const messages = [];

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {

        console.log(`New connection ${socketClient.id}`);

        let productsBefore = await PM.getProducts();

        socketClient.emit('listProducts', productsBefore);

        socketClient.on("deleteProduct", async (id) => {
            await PM.deleteProductById(id);
            let productsAfter = await PM.getProducts();
            io.sockets.emit("listProducts", productsAfter);
        });

        socketClient.on("addProduct", async (product) => {
            await PM.addProduct(product);
            let productsAfter = await PM.getProducts();
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
