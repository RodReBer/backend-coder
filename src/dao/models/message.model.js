import mongoose, { Schema } from "mongoose";

const modelSchema = new Schema({
    user: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model("Message", modelSchema)
