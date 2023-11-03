import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import ProductManager from "../src/dao/ProductManager.js";
import MessageManager from "../src/dao/MessageManager.js";

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {
        // console.log(`New connection ${socketClient.id}`);

        let productsBefore = await ProductManager.get();

        let messagesBefore = await MessageManager.get();

        socketClient.emit('listProducts', productsBefore);

        socketClient.emit('listMessages', messagesBefore);

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

        socketClient.on("new-user", async (data) => {
            const fecha = new Date().toTimeString().split(" ")[0]
            const user = ({
                name: data.name,
                date: fecha,
                img: data.imageUrl,
            })

            let messages = await MessageManager.get();

            if (messages.length == 0) {
                socketClient.broadcast.emit("first-new-user", user);
                socketClient.emit("first-personal-conection", user);
            } else {
                socketClient.broadcast.emit("new-user", user, messages);
                socketClient.emit("personal-conection", user, messages);
            }
        });

        //msg de enviado 
        socketClient.on("user-message", async (data) => {
            const hora = new Date().toTimeString().split(" ")[0]
            const message = ({
                user: data.email,
                name: data.name,
                img: data.image,
                message: data.message,
                date: hora
            })

            await MessageManager.create(message);
            let messages = await MessageManager.get();

            io.sockets.emit("user-message", messages);
        });

    });
}
