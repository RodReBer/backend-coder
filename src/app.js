import handlebars from 'express-handlebars';
import express from 'express';
import path from 'path';


import productsApiRouter from './routes/api/products.router.js';
import cartRouter from './routes/api/cart.router.js';
import realTimeProductsViewsRouter from './routes/views/realTimeProducts.router.js';
import indexViewsRouter from './routes/views/index.router.js';
import productsViewsRouter from './routes/views/products.router.js';
import chatViewsRouter from './routes/views/chat.router.js';
import cartsViewsRouter from './routes/views/cart.router.js';
import SessionsRouter from './routes/api/sessions.router.js';

import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { URI } from './dao/db/mongodb.js';

const app = express();

const SESSION_SECRET = "CODIGOSECRET";

app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: URI,
        mongoOptions: {},
        ttl: 10,
    }),
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", productsViewsRouter, realTimeProductsViewsRouter, chatViewsRouter, cartsViewsRouter, indexViewsRouter);

app.use("/api", SessionsRouter);

app.use("/api/products", productsApiRouter);

app.use("/api/carts", cartRouter);

app.use((error, req, res, next) => {
    const message = `ha ocurrido un error desconocido: (${error.message})`;
    console.log(message);
    res.status(500).json({ status: "error", message });
})


export default app;
