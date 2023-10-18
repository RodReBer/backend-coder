import { Router } from "express";
import ProductManager from "../classes/productManager.js";
import path from "path";
import { __dirname } from "../utils.js";

const router = Router();

const PM = new ProductManager(path.join(__dirname, './data/products.json'));

router.get("/", async (req, res) => {
    const products = await PM.getProducts();
    res.render("home", { title: "Backend 2023", products });
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await PM.getProducts();
    res.render("realTimeProducts", { title: "Backend 2023", products });
})

export default router;