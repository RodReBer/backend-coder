import { Router } from "express";
import ProductManager from "../classes/productManager.js";
import { __dirname } from "../utils.js";
import path from 'path';

const productManager = new ProductManager(path.join(__dirname, './data/products.json'));

const router = Router();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
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
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
});

router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const updateProduct = req.body;
        await productManager.updateProduct(pid, updateProduct);
        res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
        res.status(404).json({ error: "Error al actualizar el producto" });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        await productManager.deleteProduct(pid)
        res.status(201).json({ message: 'Producto borrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar el producto' });
    }
})

export default router;
