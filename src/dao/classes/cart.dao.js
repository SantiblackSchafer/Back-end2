import { CartModel } from '../models/cart.model.js';

export class CartDAO {
    async findById(id) {
        return CartModel.findById(id).populate('products.product');
    }

    async create(userId) {
        return CartModel.create({ user: userId, products: [] });
    }

    async addProduct(cartId, productId, quantity) {
        return CartModel.findByIdAndUpdate(
        cartId,
        { $push: { products: { product: productId, quantity } } },
        { new: true }
        );
    }

    async updateProducts(cartId, products) {
        return CartModel.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
        );
    }
}