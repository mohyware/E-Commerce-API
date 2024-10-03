const express = require('express');
const {
    getCartItem,
    createCartItem,
    updateCartItem,
    deleteCartItem,
    clearCartItems } = require('../controllers/cartitem-controller')

const {
    getCart,
    createCart,
    deleteCart
} = require('../controllers/cart-controller')


const router = express.Router();

// Cart routes
router.get('/', getCart);
router.post('/', createCart);
router.delete('/', deleteCart);

// Cart Item routes
router.get('/item/:itemId', getCartItem);
router.post('/item', createCartItem);
router.patch('/item/:itemId', updateCartItem);
router.delete('/item/:itemId', deleteCartItem);
router.delete('/item/', clearCartItems);

module.exports = router;
