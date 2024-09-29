const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategory,
    updateCategory,
    createCategory,
    deleteCategory
} = require('../controllers/category-controller');

router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);
//admin only
router.post('/', createCategory);
router.patch('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

module.exports = router;
