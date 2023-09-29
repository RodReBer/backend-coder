const { read } = require('fs');

const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const file = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(file);
        } catch (error) {
            throw new Error("Error al obtener productos: " + error.message);
        }
    }

    async addProduct(newProduct) {
        if (!newProduct) {
            throw new Error("Producto no encontrado");
        }

        try {
            let products = [];

            try {
                // Intenta leer el archivo si existe
                let file = await fs.readFile(this.path, "utf-8");
                if (file) {
                    products = JSON.parse(file);
                }
            } catch (readError) {
                // Si el archivo no existe, lo crea
                if (readError.code === "ENOENT") {
                    await fs.writeFile(this.path, "[]", "utf-8");
                } else {
                    throw new Error("Error al leer archivo: " + readError.message);
                }
            }

            let product = products.find(prod => prod.code === newProduct.code);

            if (product) {
                throw new Error("Código ya existente");
            } else {
                newProduct.id = products.length + 1;
                products.push(newProduct);

                // Crea el archivo o sobrescribe si ya existe
                await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
            }
        } catch (error) {
            throw new Error("Error al agregar producto: " + error.message);
        }
    }


    async getProductById(id) {
        if (!id) {
            throw new Error("No se ha ingresado un ID");
        }

        try {
            const file = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(file);
            const product = products.find(product => product.id == id);

            if (!product) {
                throw new Error("Producto no encontrado");
            }

            return product;
        } catch (error) {
            throw new Error("Error al obtener producto por ID: " + error.message);
        }
    }

    async updateProduct(id, updateProduct) {
        if (!id || !updateProduct) {
            throw new Error("Producto no encontrado");
        }

        try {
            const file = await fs.readFile(this.path, "utf-8");
            const products = JSON.parse(file);
            const productIndex = products.findIndex(prod => prod.id === id);

            if (productIndex === -1) {
                throw new Error("ID no encontrado: " + id);
            }

            updateProduct.id = id;
            products[productIndex] = updateProduct;

            await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
        } catch (error) {
            throw new Error("Error al actualizar producto: " + error.message);
        }
    }

    async deleteProduct(id) {
        if (!id) {
            throw new Error("No se ha ingresado un ID");
        }

        try {
            const file = await fs.readFile(this.path, "utf-8");
            const products = JSON.parse(file);
            const productIndex = products.findIndex(prod => prod.id === id);

            if (productIndex === -1) {
                throw new Error("ID inválido o no encontrado: " + id);
            }

            products.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
            console.log("Producto eliminado ID:", id);
        } catch (error) {
            throw new Error("Error al eliminar producto: " + error.message);
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = null;
    }
}

const productManager = new ProductManager("./products.json");

// Ejemplo de uso:
let producto1 = new Product("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "codigo1", 100);
let producto2 = new Product("Producto 2", "Descripción 2", 20.99, "imagen2.jpg", "codigo2", 200);
let producto3 = new Product("Producto 3", "Descripción 3", 30.99, "imagen3.jpg", "codigo3", 300);
let producto4 = new Product("Producto 4", "Descripción 4", 40.99, "imagen4.jpg", "codigo4", 400);
let producto5 = new Product("Producto 5", "Descripción 5", 50.99, "imagen5.jpg", "codigo5", 500);
let producto6 = new Product("Producto 6", "Descripción 6", 60.99, "imagen6.jpg", "codigo6", 600);
let producto7 = new Product("Producto 7", "Descripción 7", 70.99, "imagen7.jpg", "codigo7", 700);
let producto8 = new Product("Producto 8", "Descripción 8", 80.99, "imagen8.jpg", "codigo8", 800);
let producto9 = new Product("Producto 9", "Descripción 9", 90.99, "imagen9.jpg", "codigo9", 900);
let producto10 = new Product("Producto 10", "Descripción 10", 100.99, "imagen10.jpg", "codigo10", 1000);

(async () => {
    try {
        // Crear y agregar productos uno por uno de forma secuencial
        await productManager.addProduct(producto1);
        await productManager.addProduct(producto2);
        await productManager.addProduct(producto3);
        await productManager.addProduct(producto4);
        await productManager.addProduct(producto5);
        await productManager.addProduct(producto6);
        await productManager.addProduct(producto7);
        await productManager.addProduct(producto8);
        await productManager.addProduct(producto9);
        await productManager.addProduct(producto10);

        // Obtener la lista de productos después de agregarlos
        // const products = await productManager.getProducts();
        // console.log("Productos:", products);
    } catch (error) {
        console.error(error.message);
    }
})();

