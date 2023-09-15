class ProductManager {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(product) {
        try {
            product.code = this.generateUniqueCode();

            this.validateProduct(product);
            product.id = this.nextProductId++;


            this.products.push(product);
        } catch (error) {
            console.error(error.message);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            return "Producto no encontrado.";
        }
    }

    validateProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            throw new Error("El código del producto ya existe.");
        }
    }

    generateUniqueCode() {
        let code;
        do {
            code = Math.random().toString(36).substring(2, 50);
        } while (this.products.some(existingProduct => existingProduct.code === code));

        return code;
    }
}

class Product {
    constructor(title, description, price, thumbnail, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.id = null; // Añadir el campo id
        this.code = null; // Añadir el campo code
    }
}

const productManager = new ProductManager();
productManager.addProduct(new Product("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", 100));
productManager.addProduct(new Product("Producto 2", "Descripción 2", 15.99, "imagen2.jpg", 50));
productManager.addProduct(new Product("Producto 3", "Descripción 3", 20.99, "imagen3.jpg", 10));
productManager.addProduct(new Product("Producto 4", "Descripción 4", 25.99, "imagen4.jpg", 5));
productManager.addProduct(new Product("Producto 5", "Descripción 5", 30.99, "imagen5.jpg", 1));
productManager.addProduct(new Product("Producto 6", "Descripción 6", 35.99, "imagen6.jpg", 2));
productManager.addProduct(new Product("Producto 7", "Descripción 7", 40.99, "imagen7.jpg", 43));
productManager.addProduct(new Product("Producto 8", "Descripción 8", 45.99, "imagen8.jpg", 55));
productManager.addProduct(new Product("Producto 9", "Descripción 9", 50.99, "imagen9.jpg", 70));
productManager.addProduct(new Product("Producto 10", "Descripción 10", 55.99, "imagen10.jpg", 22));

console.log(productManager.getProducts());