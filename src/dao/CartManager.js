import cartModel from "./models/cart.model";

export default class CartManager {
    static async get() {
        try {
            const cart = await cartModel.find();
            return cart;
        } catch (error) {
            throw error;
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

    static async create(cart) {
        try {
            const newCart = await cartModel.create(cart);
            return newCart;
        } catch (error) {
            throw error;
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

    static async deleteById(id) {
        try {
            await cartModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}