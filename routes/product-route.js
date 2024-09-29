const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct } = require('../controllers/product-controller');

router.get('/', getAllProducts);
router.get('/:productId', getProduct);
//admin only
router.post('/', createProduct);
router.patch('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;