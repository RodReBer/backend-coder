import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import ProductManager from './productManager.js';
import { __dirname } from '../utils.js';

const productAll = new ProductManager(path.join(__dirname, './data/products.json'));

class CartManager {
    constructor() {
        this.path = 'src/data/carts.json';
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(carts);
    };

    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    };

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = uuidv4();
        let newCart = [{ id: id, products: [] }, ...cartsOld];
        await this.writeCarts(newCart);
        return ("carrito agregado")
    }

    getCartById = async (id) => {
        let cartById = await this.exist(id);
        if (!cartById) return ("carrito no encontrado");

        return cartById;
    };

    addProductToCart = async (productId, cartId) => {

        let cartById = await this.exist(cartId);
        if (!cartById) return ("Carrito no encontrado");
        let productById = await productAll.exist(productId);
        if (!cartById) return ("Producto no encontrado");

        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

        if (cartById.products.some((prod) => prod.id === productId)) {
            let moreProductsInCart = cartById.products.find((prod) => prod.id === productId);
            moreProductsInCart.quantity++;
            let newCart = [cartById, ...cartFilter];
            await this.writeCarts(newCart);
            return ("Producto sumado al carrito");
        }

        cartById.products.push({ id: productById.id, quantity: 1 });

        let newCart = [cartById, ...cartFilter];

        await this.writeCarts(newCart);
        return ("Producto agregado al carrito");
    }
}

export default CartManager;