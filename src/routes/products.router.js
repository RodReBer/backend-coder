import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../dao/ProductManager.js"

const router = Router();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    const { query = {} } = req;
    try {
        const products = await ProductManager.get(query);
        if (limit) {
            const productsLimit = products.slice(0, limit);
            return res.status(200).json(productsLimit);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

router.get("/:pid", async (req, res) => {
    const { params: { pid } } = req;
    const product = await ProductManager.getById(pid);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const product = await ProductManager.create(body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const { params: { pid }, body } = req;
        await ProductManager.updateById(pid, body);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: "Error al actualizar el producto" });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { params: { pid } } = req;
        await ProductManager.deleteById(pid);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: "Error al actualizar el producto" });
    }
});

export default router;
