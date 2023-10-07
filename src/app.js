import ProductManager from './classes/classes.js';
import handleBars from 'express-handlebars';
import express from 'express';
import path from 'path';

import { __dirname } from './utils/utils.js';

const productManager = new ProductManager("/data/products.json");
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine('handleBars', handleBars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.get("/products", async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if (limit) {
            const productsLimit = products.slice(0, limit);
            return res.status(200).json(productsLimit);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} ...`);
});

export default app;
