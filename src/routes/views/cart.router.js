import { Router } from "express";
import CartManager from "../../dao/CartManager.js";
import { privateRouter } from "../../utils.js";

const router = Router();

router.get("/carts", privateRouter, async (req, res) => {
    const carts = await CartManager.get();
    res.render("carts", { title: "RK | Carts", carts: carts.map(c => c.toJSON()), user: req.session.user });
});

export default router;