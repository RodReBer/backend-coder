import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find((product) => product.id === id);
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(products);
    };

    getProducts = async () => {
        let products = await this.readProducts();
        return products;
    };

    getProductById = async (id) => {
        let products = this.exist(id);

        if (!products) return ("Producto no encontrado");

        return products;
    };

    async addProduct(newProduct) {
        if (!newProduct) {
            throw new Error("Producto no encontrado");
        }

        try {
            let products = [];

            try {
                let file = await fs.readFile(this.path, "utf-8");
                if (file) {
                    products = JSON.parse(file);
                }
            } catch (readError) {
                if (readError.code === "ENOENT") {
                    await fs.writeFile(this.path, "[]", "utf-8");
                } else {
                    throw new Error("Error al leer archivo: " + readError.message);
                }
            }

            let existingProduct = products.find(prod => prod.id === newProduct.id);

            if (existingProduct) {
                throw new Error("Ya existe un producto con el mismo ID");
            } else {
                newProduct.id = uuidv4();
                products.push(newProduct);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
            }
        } catch (error) {
            throw new Error("Error al agregar producto: " + error.message);
        }
        return newProduct;
    };

    deleteProductById = async (id) => {
        let products = await this.readProducts();
        let product = products.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(products));
        return product;
    };

    updateProduct = async (id, updates) => {
        try {
            let oldProducts = await this.readProducts();

            const indexToUpdate = oldProducts.findIndex((product) => product.id === id);

            if (indexToUpdate === -1) {
                throw new Error(`El producto con ID ${id} no existe.`);
            }

            oldProducts[indexToUpdate] = { id, ...updates };

            await fs.writeFile(this.path, JSON.stringify(oldProducts));

            return oldProducts[indexToUpdate];
        } catch (error) {
            throw error;
        }
    };
}

// class Product {
//     constructor(title, description, price, thumbnail, code, stock) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.thumbnail = thumbnail;
//         this.code = code;
//         this.stock = stock;
//         this.id = null;
//     }
// }

// const productManager = new ProductManager("../data/products.json");

// // Ejemplo de uso:
// let producto1 = new Product("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "codigo1", 100);
// let producto2 = new Product("Producto 2", "Descripción 2", 20.99, "imagen2.jpg", "codigo2", 200);
// let producto3 = new Product("Producto 3", "Descripción 3", 30.99, "imagen3.jpg", "codigo3", 300);
// let producto4 = new Product("Producto 4", "Descripción 4", 40.99, "imagen4.jpg", "codigo4", 400);
// let producto5 = new Product("Producto 5", "Descripción 5", 50.99, "imagen5.jpg", "codigo5", 500);
// let producto6 = new Product("Producto 6", "Descripción 6", 60.99, "imagen6.jpg", "codigo6", 600);
// let producto7 = new Product("Producto 7", "Descripción 7", 70.99, "imagen7.jpg", "codigo7", 700);
// let producto8 = new Product("Producto 8", "Descripción 8", 80.99, "imagen8.jpg", "codigo8", 800);
// let producto9 = new Product("Producto 9", "Descripción 9", 90.99, "imagen9.jpg", "codigo9", 900);
// let producto10 = new Product("Producto 10", "Descripción 10", 100.99, "imagen10.jpg", "codigo10", 1000);

// (async () => {

//     // const initialProducts = await productManager.getProducts();

//     // console.log("Productos iniciales:", initialProducts);

//     const newProduct1 = await productManager.addProduct(producto1);

//     await productManager.addProduct(producto2);
//     await productManager.addProduct(producto3);
//     await productManager.addProduct(producto4);
//     await productManager.addProduct(producto5);
//     await productManager.addProduct(producto6);
//     await productManager.addProduct(producto7);
//     await productManager.addProduct(producto8);
//     await productManager.addProduct(producto9);
//     await productManager.addProduct(producto10);

//     const updatedProducts = await productManager.getProducts();
//     console.log("Productos actualizados:", updatedProducts);
//     const productId = newProduct1.id;
//     const foundProduct = await productManager.getProductById(productId);
//     console.log("Producto encontrado por ID:", foundProduct);
//     newProduct1.price = 250;
//     const newProductUpdated = await productManager.updateProduct(productId, newProduct1);
//     console.log("Producto actualizado:", newProductUpdated);
//     await productManager.deleteProductById(productId);
//     console.log("Producto eliminado.");
//     const deletedProduct = await productManager.getProductById(productId);
//     console.log("Producto eliminado encontrado por ID:", deletedProduct);
//     const updatedProducts2 = await productManager.getProducts();
//     console.log("Productos actualizados:", updatedProducts2);
// })();

export default ProductManager;