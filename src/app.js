import handlebars from 'express-handlebars';
import express from 'express';
import path from 'path';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { __dirname } from './utils.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine('handleBars', handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// app.use("/", chatRouter);

app.get("/", (req, res) => {
    res.render("index",
        {
            title: "hola",
        })
});

// app.use((error, req, res, next) => {
//     const message = `ha ocurrido un error desconocido: (${error.message})`;
//     console.log(message);
//     res.status(500).json({ status: "error", message });
// })

app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} ...`);
});

export default app;
