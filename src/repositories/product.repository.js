import { ProductDAO } from '../dao/classes/product.dao.js';

export class ProductRepository {
    constructor() {
        this.dao = new ProductDAO();
    }

    async getProducts() {
        return this.dao.findAll();
    }

    async getProductById(id) {
        return this.dao.findById(id);
    }

    async createProduct(productData) {
        return this.dao.create(productData);
    }

    async updateProduct(id, productData) {
        return this.dao.update(id, productData);
    }

    async deleteProduct(id) {
        return this.dao.delete(id);
    }

    async updateStock(id, quantity) {
        return this.dao.updateStock(id, quantity);
    }
}