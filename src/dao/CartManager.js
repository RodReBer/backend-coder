import cartModel from "./models/cart.model.js";
import ProductManager from "./ProductManager.js";
import { Exception } from "../utils.js";

export default class CartManager {

    static async get(query = {}) {
        try {
            const criteria = {};
            if (query.course) {
                criteria.course = query.course;
            }
            return cartModel.find(criteria);

        } catch (error) {
            throw error;
        }
    }

    static async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Exception('No se encontro el carrito', 404)
            }

            const existingProductIndex = cart.products.findIndex(
                (product) => String(product.productId) === String(productId)
            );
            const product = await ProductManager.getById(productId);
            if (!product) {
                throw new Exception('No se encontro el producto', 404)
            }
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += Number(quantity)
            } else {
                cart.products.push({ productId, quantity })
            }
            const updatedCart = await cart.save();

            return updatedCart;
        } catch (error) {
            console.error("Error", error.message);
            throw new Exception("Error al agregar producto al carrito", 500)

        }
    }

    static async getById(id) {
        try {
            const cart = await cartModel.findById(id);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    static async createCart(newCart = {}) {
        try {
            const cart = await cartModel.create(newCart)
            return cart;
        } catch (error) {
            console.error('Error al crear el carrito', error.message)
            throw new Exception("No se pudo crear el carrito ", 500);
        }
    }

    static async updateById(id, cart) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(id, cart, { new: true });
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCartById(id) {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(id);
            return deletedCart;
        } catch (error) {
            throw error;
        }
    }

    static async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findOne({ _id: cartId, 'products.productId': productId });

            if (!cart) {
                throw new Error("Product not found in the specified cart");
            }

            const productIndex = cart.products.findIndex(product => product.productId === productId);

            if (productIndex === -1) {
                throw new Error("Product not found in the cart");
            }

            cart.products.splice(productIndex, 1);

            await cart.save();

            return { success: true, message: "Product deleted from the cart successfully" };
        } catch (error) {
            throw error;
        }
    }

}