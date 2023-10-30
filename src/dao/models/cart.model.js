import mongoose, { Schema } from "mongoose";

const products = new Schema({
    quantity: { type: Number, required: true },
}, { timestamps: true });

const cartSchema = new Schema({
    products: { type: products, required: true, default: [] },
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema)