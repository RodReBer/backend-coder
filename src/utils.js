import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    };
};

export const privateRouter = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

export const publicRouter = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/profile");
    }
    next();
};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
