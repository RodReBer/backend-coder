import { Router } from "express";

const router = Router();

const cart = [];

router.post("/", (req, res) => {
    const cartId = cart.length + 1;
    cart[cartId] = { id: cartId, products: [] };
    res.status(201).json(cart[cartId]);
});

router.get("/:cartId", (req, res) => {
    const cartC = cart[req.params.cartId];
    if (!cartC) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    } else {
        res.json(cartC.products);
    }
});

router.post("/:cartId/product/:pid", (req, res) => {
    const cart = cart[req.params.cartId];
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    } else {
        const productId = req.params.pid;
        const product = { id: productId, quantity: 1 };
        const productInCart = cart.products.find(product => product.id === productId);
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push(product);
        }
        res.json(cart.products);
    }
});
export default router;