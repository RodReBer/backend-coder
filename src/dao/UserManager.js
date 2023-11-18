import userModel from "./models/user.model.js";
import { Exception } from "../utils.js";
import bcrypt from 'bcrypt';


export default class UserManager {
    static get(query = {}) {
        const criteria = {};
        if (query.course) {
            criteria.course = query.course;
        }
        return userModel.find(criteria);
    }

    static async getUserData(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            return "Email or password incorrect";
        }
        const passwordMatch =  bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            throw new Exception("Invalid email or password", 400);
        }
    }

}