import productModel from "./models/product.model.js";

export default class ProductManager {
    static get(query = {}) {
        const criteria = {};
        if (query.course) {
            criteria.course = query.course;
        }
        return productModel.find(criteria);
    }

    static async getById(id) {
        const product = await productModel.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }

    static async create(data) {
        const product = await productModel.create(data);
        return product;
    }

    static async updateById(id, data) {
        const product = await productModel.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        const criteria = { _id: id };
        const operation = { $set: data };
        await productModel.updateOne(criteria, operation);
    }

    static async deleteById(id) {
        const product = await productModel.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        const criteria = { _id: id };
        await productModel.deleteOne(criteria);
    }
}