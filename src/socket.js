import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import ProductManager from "./dao/ProductManager.js";
import MessageManager from "./dao/MessageManager.js";
import CartManager from './dao/CartManager.js';


let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {
        // console.log(`New connection ${socketClient.id}`);

        let messagesBefore = await MessageManager.get();

        let cartsBefore = await CartManager.get();

        socketClient.emit('listCarts', cartsBefore);

        socketClient.emit('listMessages', messagesBefore);

        socketClient.on("deleteProduct", async (id) => {
            await ProductManager.deleteById(id);

        });

        socketClient.on("deleteProductOfTheCart", async (cartId, productId) => {
            try {

                await CartManager.deleteProductFromCart(cartId.cartId, cartId.productId);
                let cartsAfter = await CartManager.get();
                io.sockets.emit("listCarts", cartsAfter);
            } catch (error) {
                console.log(error.message);
            }


        });

        socketClient.on("deleteCart", async (cartId) => {
            try {
                await CartManager.deleteCartById(cartId.cartId);
                let cartsAfter = await CartManager.get();
                io.sockets.emit("listCarts", cartsAfter);
            } catch (error) {
                console.log(error.message);
            }
        });

        socketClient.on("addProduct", async (product) => {
            await ProductManager.create(product);
        });

        socketClient.on("addCartNewCart", async () => {
            await CartManager.createCart();
            let cartsAfter = await CartManager.get();
            io.sockets.emit("listCarts", cartsAfter);
        });

        socketClient.on("addCartById", async (cart) => {
            await CartManager.addProductToCart(cart.cartId, cart.productId, cart.quantity);
            let cartsAfter = await CartManager.get();
            io.sockets.emit("listCarts", cartsAfter);
        })

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

};

