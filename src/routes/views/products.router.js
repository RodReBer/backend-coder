import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await ProductManager.get();
    res.render("home", { title: "Backend 2023", products: products.map(p => p.toJSON()) });
});

export default router;