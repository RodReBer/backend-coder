import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';

const opts = {
    userNameField: 'email',
    passReqToCallback: true,
}

export const init = () => {
    passport.use("register", new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error("El usuario ya existe"));
            }
            const newUser = await UserModel.create({
                ...req.body,
                password: createHash(password),
            });
            done(null, newUser);
        } catch (error) {
            done(newError("Ocurrio un error durante la autenticacion"))
        }
    }))

    passport.use("login", new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(new Error("Correo o contraseña invalido"));
            }
            const isPassValid = isValidPassword(password, user);

            if (!isPassValid) {
                return done(new Error("Correo o contraseña invalido"));
            }
            done(null, user);
        } catch (error) {
            done(newError("Ocurrio un error durante la autenticacion"))
        }
    }))


    passport.serializeUser(async (user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user);
    })
}