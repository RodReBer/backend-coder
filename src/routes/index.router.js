// import ProductManager from "../classes/productManager.js";
// import path from "path";
import { Router } from "express";
import { __dirname } from "../utils.js";
import productModel from "../dao/models/product.model.js";

const router = Router();

// const PM = new ProductManager(path.join(__dirname, './data/products.json'));

router.get("/", async (req, res) => {
    // const products = await PM.getProducts();
    const products = await productModel.find();
    console.log(products);

    res.render("home", { title: "Backend 2023", products });
})

export default router;