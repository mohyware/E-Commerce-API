const { Op } = require('sequelize');
const { NotFoundError, BadRequestError } = require('../errors')
const Product = require('../models/product-model');

const getAllProducts = async (req, res) => {
    const { page, limit, search, categoryId, sortBy = 'id', sortOrder = 'ASC' } = req.query;

    const options = {
        order: [[sortBy, sortOrder.toUpperCase()]],
        where: {},
    };

    if (search) {
        options.where = { name: { [Op.iLike]: `%${search}%` } };
    }

    if (categoryId === '-1') {
        options.where.categoryId = { [Op.is]: null };
    } else if (categoryId) {
        options.where.categoryId = categoryId;
    }

    if (page && limit) {
        options.offset = (page - 1) * parseInt(limit);
        options.limit = parseInt(limit) || 10;
    }

    const products = await Product.findAll(options);
    const count = await Product.count(options);

    if (!count) {
        throw new NotFoundError('No products was found')
    }

    res.json({
        products,
        totalPages: Math.ceil(count / options.limit) || 1,
        currentPage: page || 1,
    });

};

const getProduct = async (req, res) => {
    const {
        params: { productId: productId },
    } = req
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new NotFoundError('product not found')
    }
    res.json(product);
};

const createProduct = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
    const {
        body: { name, description, price, stock, categoryId },
        params: { productId: productId },
    } = req

    if (!name && !description && !price && !stock && !categoryId) {
        throw new BadRequestError('You must provide a value for any field to proceed with the update');
    }
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new NotFoundError('product not found')
    }
    await product.update(req.body);
    res.json({ message: "product updated successfully ", product });
};

const deleteProduct = async (req, res) => {
    const {
        params: { productId: productId },
    } = req
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new NotFoundError('product not found')
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };