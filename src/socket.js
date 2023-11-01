import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import ProductManager from "../src/dao/ProductManager.js";

let io;


export const initSocket = (httpServer) => {
    const messages = [];

    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {

        // console.log(`New connection ${socketClient.id}`);

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

        socketClient.on("new-user", (data) => {
            const fecha = new Date().toTimeString().split(" ")[0]
            const user = ({
                id: socketClient.id,
                name: data.name,
                date: fecha,
                img: data.imageUrl,
            })
            messages.push(user);
            socketClient.broadcast.emit("new-user", messages);
            socketClient.emit("personal-conection", messages);
        });

        //msg de enviado 
        socketClient.on("user-message", (data) => {
            const fecha = new Date().toTimeString().split(" ")[0]
            messages.push({
                id: socketClient.id,
                name: data.name,
                message: data.message,
                date: fecha,
                img: data.imageUrl,
            })
            io.sockets.emit("user-message", messages);
        });

        // socketClient.on("disconnect", () => {
        //     console.log(`Disconnected ${socketClient.id}`);
        // });

        // socketClient.broadcast.emit('new-client');

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
