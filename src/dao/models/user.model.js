import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    img: String,
    provider: String,
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
