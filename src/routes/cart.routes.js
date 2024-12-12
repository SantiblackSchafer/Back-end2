import { Router } from 'express';
import { CartRepository } from '../repositories/cart.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { TicketRepository } from '../repositories/ticket.repository.js';
import { isUser } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

// Add product to cart (only users)
router.post('/:cid/products/:pid', 
    passport.authenticate('jwt', { session: false }), 
    isUser,
    async (req, res) => {
        try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;
        
        const cart = await cartRepository.addProduct(cid, pid, quantity);
        res.json({ status: 'success', cart });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });

    // Process purchase
    router.post('/:cid/purchase',
    passport.authenticate('jwt', { session: false }),
    isUser,
    async (req, res) => {
        try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);
        
        const failedProducts = [];
        const successfulProducts = [];
        let totalAmount = 0;

        // Process each product
        for (const item of cart.products) {
            const product = await productRepository.getProductById(item.product._id);
            
            if (product.stock >= item.quantity) {
            // Update stock
            await productRepository.updateStock(product._id, item.quantity);
            totalAmount += product.price * item.quantity;
            successfulProducts.push(item);
            } else {
            failedProducts.push(item);
            }
        }

        // Create ticket if there are successful purchases
        if (successfulProducts.length > 0) {
            const ticket = await ticketRepository.createTicket({
            amount: totalAmount,
            purchaser: req.user.email
            });

            // Update cart with failed products only
            await cartRepository.updateProducts(cid, failedProducts);

            res.json({
            status: 'success',
            ticket,
            failedProducts: failedProducts.map(item => item.product._id)
            });
        } else {
            res.status(400).json({
            status: 'error',
            message: 'No products could be purchased',
            failedProducts: failedProducts.map(item => item.product._id)
            });
        }
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });