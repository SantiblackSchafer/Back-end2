import { Router } from 'express';
import { ProductRepository } from '../repositories/product.repository.js';
import { isAdmin } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();
const productRepository = new ProductRepository();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await productRepository.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // Create product (admin only)
    router.post('/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    async (req, res) => {
        try {
        const product = await productRepository.createProduct(req.body);
        res.status(201).json(product);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });

    // Update product (admin only)
    router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    async (req, res) => {
        try {
        const product = await productRepository.updateProduct(req.params.id, req.body);
        res.json(product);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });

    // Delete product (admin only)
    router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    async (req, res) => {
        try {
        await productRepository.deleteProduct(req.params.id);
        res.status(204).send();
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
});