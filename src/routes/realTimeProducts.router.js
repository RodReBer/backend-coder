// import ProductManager from "../classes/productManager.js";
// import path from 'path';
import { Router } from "express";
import { __dirname } from "../utils.js";
import productModel from "../dao/models/product.model.js";

const router = Router();

// const PM = new ProductManager(path.join(__dirname, './data/products.json'));

router.get("/realtimeproducts", async (req, res) => {
    // const products = await PM.getProducts();
    const products = await productModel.find();
    res.render("realTimeProducts", { title: "Real Time Products", products });
});

export default router;