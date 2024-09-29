const { Product } = require('../models/product-model');
const { Op } = require('sequelize');
const { NotFoundError } = require('../errors')


const getAllProducts = async (req, res) => {
    const { page, limit, search } = req.query;

    const where = {};
    if (search) {
        where.name = { [Op.iLike]: `%${search}%` };
    }

    const options = {
        where,
        offset: (page - 1) * limit,
        limit: parseInt(limit) || 10,
    };

    const products = await Product.findAll(options);
    const count = await Product.count(options);

    if (!products) {
        throw new NotFoundError('No products was found')
    }

    res.json({
        products,
        totalPages: Math.ceil(count / options.limit),
        currentPage: page,
    });

};

const getProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        throw new NotFoundError('product not found')
    }
    res.json(product);
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid product data' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            throw new NotFoundError('product not found')
        }

        await product.update(req.body);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid product data' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            throw new NotFoundError('product not found')
        }

        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };