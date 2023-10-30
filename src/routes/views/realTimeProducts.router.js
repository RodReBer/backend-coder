import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";

const router = Router();

router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductManager.get();
    res.render("realTimeProducts", { title: "Real Time Products", products: products.map(p => p.toJSON()) });
});

export default router;