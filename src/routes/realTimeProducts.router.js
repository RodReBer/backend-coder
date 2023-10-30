import { Router } from "express";
import ProductManager from "../classes/productManager.js";
import { __dirname } from "../utils.js";
import path from 'path';

const router = Router();

const PM = new ProductManager(path.join(__dirname, './data/products.json'));

router.get("/realtimeproducts", async (req, res) => {
    const products = await PM.getProducts();
    res.render("realTimeProducts", { title: "Real Time Products", products });
});

export default router;