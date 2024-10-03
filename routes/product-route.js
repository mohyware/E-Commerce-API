const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct } = require('../controllers/product-controller');
const authenticateJWT = require('../middleware/authentication');
const adminAuth = require('../middleware/admin-authorization');
// admin only
router.post('/', authenticateJWT, adminAuth, createProduct);
router.patch('/:productId', authenticateJWT, adminAuth, updateProduct);
router.delete('/:productId', authenticateJWT, adminAuth, deleteProduct);
// any user
router.get('/', getAllProducts);
router.get('/:productId', getProduct);

module.exports = router;