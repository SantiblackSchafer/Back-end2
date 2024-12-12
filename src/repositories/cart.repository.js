import { CartDAO } from '../dao/classes/cart.dao.js';

export class CartRepository {
    constructor() {
        this.dao = new CartDAO();
    }

    async getCartById(id) {
        return this.dao.findById(id);
    }

    async createCart(userId) {
        return this.dao.create(userId);
    }

    async addProduct(cartId, productId, quantity) {
        return this.dao.addProduct(cartId, productId, quantity);
    }

    async updateProducts(cartId, products) {
        return this.dao.updateProducts(cartId, products);
    }
}