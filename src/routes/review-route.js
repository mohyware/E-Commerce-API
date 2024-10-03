const express = require('express');
const router = express.Router();
const { createReview,
    getReviewsForProduct,
    getReviewById,
    getUserReviews,
    updateReview,
    deleteReview } = require('../controllers/review-controller');

router.post('/', createReview);
router.get('/product/:productId', getReviewsForProduct);
router.get('/mine/', getUserReviews);
router.get('/:id', getReviewById);
router.patch('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
