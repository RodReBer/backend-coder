import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { createHash, isValidPassword } from '../utils.js';
import UserManager from '../dao/UserManager.js';
import UserModel from '../dao/models/user.model.js';
import { Exception } from '../utils.js';

const opts = {
    usernameField: 'email',
    passReqToCallback: true,
};

const githubOpts = {
    clientID: "Iv1.5e091e55bc0cf422",
    clientSecret: "2f550e035329843c22120e31d55b95264477f7e2",
    callbackURL: "http://localhost:8080/api/sessions/github/callback",
}

const twitterOpts = {
    consumerKey: "eVjEjdMg8rqbuW5JZFSivvbyr",
    consumerSecret: "keQDdcE3r95xW5Vq0uFcDCu8LafcVXC2VdNzGkrtX9uyDjyaxj",
    callbackURL: "http://localhost:8080/api/sessions/twitter/callback",
}

export const init = () => {
    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error('User already register 😨'));
            }
            const newUser = await UserModel.create({
                ...req.body,
                password: createHash(password),
                role: 'user',
                provider: 'local',
            });
            done(null, newUser);
        } catch (error) {
            done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const adminEmail = "adminCoder@coder.com";
            const adminPassword = "adminCod3r123";
            if (email === adminEmail && password === adminPassword) {
                const user = {
                    _id: "admin",
                    first_name: "Admin",
                    last_name: "Coder",
                    role: "admin",
                    age: 18,
                    img: "https://res.cloudinary.com/hdsqazxtw/image/upload/v1600707758/coderhouse-logo.png",
                    email: email,
                }
                done(null, user)
            } else {
                const user = await UserManager.getUserData(email, password);
                if (user === "Email or password incorrect") {
                    return done(new Exception("Email or password incorrect", 401));
                } else {
                    done(null, user)
                }
            }
        } catch (error) {
            done(new Exception(`Ocurrio un error durante la autenticacion ${error.message} 😨.`, 500));
        }
    }));

    passport.use('github', new GithubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) => {
        const email = profile._json.email;
        let user = await UserModel.findOne({ email });
        if (user) {
            return done(null, user);
        }
        console.log(profile)
        user = {
            first_name: profile._json.name,
            last_name: '',
            email,
            age: 18,
            role: 'user',
            password: '',
            img: profile._json.avatar_url,
            provider: profile.provider,
        };
        const newUser = await UserModel.create(user);
        done(null, newUser);
    }));

    passport.use("twitter", new TwitterStrategy(twitterOpts, async (accessToken, refreshToken, profile, done) => {
        // const email = profile._json.email;
        // let user = await UserModel.findOne({ email });
        // if (user) {
        //     return done(null, user);
        // }
        // console.log(email)
        console.log(profile)
        let user = {
            first_name: profile._json.name,
            last_name: '',
            email: "",
            age: 18,
            role: 'user',
            password: '',
            img: profile._json.profile_image_url,
            provider: profile.provider,
        };
        const newUser = await UserModel.create(user);
        done(null, newUser);
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        if (id == "admin") {
            const adminUser = {
                _id: "admin",
                first_name: "Admin",
                last_name: "Coder",
                role: "admin",
                age: 18,
                img: "https://res.cloudinary.com/hdsqazxtw/image/upload/v1600707758/coderhouse-logo.png",
                email: "admminCoder@coder.com"

            }
            return done(null, adminUser);
        }
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}