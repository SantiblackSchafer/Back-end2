import { ProductModel } from '../models/product.model.js';

export class ProductDAO {
    async findById(id) {
        return ProductModel.findById(id);
    }

    async findAll() {
        return ProductModel.find();
    }

    async create(productData) {
        return ProductModel.create(productData);
    }

    async update(id, productData) {
        return ProductModel.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id) {
        return ProductModel.findByIdAndDelete(id);
    }

    async updateStock(id, quantity) {
        return ProductModel.findByIdAndUpdate(
        id,
        { $inc: { stock: -quantity } },
        { new: true }
        );
    }
}