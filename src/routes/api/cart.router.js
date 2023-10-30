import { Router } from "express";
import cartManager from "../../classes/cartManager.js";
import { __dirname } from "../../utils.js";
import path from 'path';

const router = Router();
const carts = new cartManager(path.join(__dirname, './data/carts.json'));

router.get("/", async (req, res) => {
    res.send(await carts.readCarts());
});

router.post("/", async (req, res) => {
    res.send(await carts.addCarts());
});

router.get("/:cartId", async (req, res) => {
    res.send(await carts.getCartById(req.params.cartId));
});

router.post("/:cid/products/:pid", async (req, res) => {
    const cart = req.params.cid;
    let productId = req.params.pid;
    res.send(await carts.addProductToCart(productId, cart));

});

export default router;