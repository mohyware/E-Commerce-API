const { NotFoundError, BadRequestError } = require('../errors');
const Review = require('../models/review-model');

const createReview = async (req, res) => {
    const {
        user: { userId },
        body: { productId, rating, comment },
    } = req;

    if (!productId || rating === undefined || !comment) {
        throw new BadRequestError('Product ID, rating, and comment are required.');
    }

    const newReview = await Review.create({
        userId,
        productId,
        rating,
        comment,
        isVerified: true, // Assume this is set based on purchase verification
    });

    res.status(201).json({ message: 'Review created successfully', review: newReview });
};

const getReviewsForProduct = async (req, res) => {
    const { productId } = req.params;

    const reviews = await Review.findAll({
        where: { productId },
    });

    if (!reviews.length) {
        throw new NotFoundError('No reviews found for this product.');
    }

    res.status(200).json(reviews);
};

const getUserReviews = async (req, res) => {
    const {
        user: { userId },
    } = req;
    const reviews = await Review.findAll({
        where: { userId },
    });

    if (!reviews.length) {
        throw new NotFoundError('No reviews found for this user.');
    }

    res.status(200).json(reviews);
};

const getReviewById = async (req, res) => {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
        throw new NotFoundError('Review not found.');
    }

    res.status(200).json(review);
};

const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
        throw new NotFoundError('Review not found.');
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
        throw new NotFoundError('Review not found.');
    }

    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
};

module.exports = {
    createReview,
    getReviewsForProduct,
    getReviewById,
    updateReview,
    deleteReview,
    getUserReviews
};
