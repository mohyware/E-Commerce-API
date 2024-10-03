const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategory,
    updateCategory,
    createCategory,
    deleteCategory
} = require('../controllers/category-controller');
const authenticateJWT = require('../middleware/authentication');
const adminAuth = require('../middleware/admin-authorization');
//admin only
router.post('/', authenticateJWT, adminAuth, createCategory);
router.patch('/:categoryId', authenticateJWT, adminAuth, updateCategory);
router.delete('/:categoryId', authenticateJWT, adminAuth, deleteCategory);
//any user
router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);

module.exports = router;
