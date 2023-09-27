const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.nextProductId = 1;
        this.path = filePath; // Ruta del archivo de persistencia
        this.loadProductsFromFile(); // Cargar productos desde el archivo
    }

    addProduct(product) {
        try {
            product.id = this.nextProductId++;
            this.validateProduct(product);
            this.products.push(product);
            this.saveProductsToFile(); // Guardar productos en el archivo
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

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            this.validateProduct(updatedProduct);
            this.products[index] = updatedProduct;
            this.saveProductsToFile(); // Guardar productos actualizados en el archivo
            return "Producto actualizado exitosamente.";
        } else {
            return "Producto no encontrado.";
        }
    }

    deleteProduct(id) {
        fs.readFile(this.path, 'utf8', (err, data) => {
            if (err) {
                console.error("Error al cargar el archivo:", err);
                return "Error al eliminar el producto.";
            }

            try {
                const products = JSON.parse(data);
                const index = products.findIndex(product => product.id === id);
                if (index !== -1) {
                    products.splice(index, 1);

                    fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error("Error al guardar los productos en el archivo:", err);
                            return "Error al eliminar el producto.";
                        }
                        return "Producto eliminado exitosamente.";
                    });
                } else {
                    console.error("Producto no encontrado.");
                    return "Producto no encontrado.";
                }
            } catch (error) {
                console.error("Error al parsear el archivo:", error);
                return "Error al eliminar el producto.";
            }
        });
    }




    validateProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios.");
        }
    }


    loadProductsFromFile() {
        fs.readFile(this.path, 'utf8', (err, data) => {
            if (err) {
                console.error("Error al cargar el archivo:", err);
                return;
            }
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextProductId = Math.max(...this.products.map(product => product.id)) + 1;
            }
        });
    }

    saveProductsToFile() {
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error al guardar los productos en el archivo:", err);
            }
        });
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
        this.id = null; // Añadir el campo id
    }
}


const productManager = new ProductManager('products.json'); // Ruta del archivo de persistencia

// Ejemplo de uso:
productManager.addProduct(new Product("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "codigo1", 100));
productManager.updateProduct(1, new Product("Producto 1 actualizado", "Descripción 1 actualizada", 12, "imagen1actualizada.jpg", "codigo2", 50))
productManager.addProduct(new Product("Producto 2", "Descripción 2", 20.99, "imagen2.jpg", "codigo2", 200));
productManager.addProduct(new Product("Producto 3", "Descripción 3", 30.99, "imagen3.jpg", "codigo3", 300));
productManager.deleteProduct(3);

