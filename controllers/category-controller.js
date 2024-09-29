const { Op } = require('sequelize');
const { NotFoundError } = require('../errors');
const Category = require('../models/category-model');

const getAllCategories = async (req, res) => {
    const { page, limit, search, sortBy = 'id', sortOrder = 'ASC' } = req.query;

    const options = {
        order: [[sortBy, sortOrder.toUpperCase()]],
    };

    if (search) {
        options.where = { name: { [Op.iLike]: `%${search}%` } };
    }

    if (page && limit) {
        options.offset = (page - 1) * parseInt(limit);
        options.limit = parseInt(limit) || 10;
    }

    const categories = await Category.findAll(options);
    const count = await Category.count(options);

    if (!count) {
        throw new NotFoundError('No categories were found');
    }

    res.json({
        categories,
        totalPages: Math.ceil(count / options.limit) || 1,
        currentPage: page || 1,
    });
};

const getCategory = async (req, res) => {
    const {
        params: { categoryId: categoryId },
    } = req
    const category = await Category.findByPk(categoryId);
    if (!category) {
        throw new NotFoundError('Category not found');
    }
    res.json(category);
};

const createCategory = async (req, res) => {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
};

const updateCategory = async (req, res) => {
    const {
        body: { name, description },
        params: { categoryId: categoryId },
    } = req
    if (!name && !description) {
        throw new BadRequestError('You must provide a value for any field to proceed with the update');
    }
    const category = await Category.findByPk(categoryId);
    if (!category) {
        throw new NotFoundError('Category not found');
    }
    await category.update(req.body);
    res.json({ message: "Category updated successfully", category });
};

const deleteCategory = async (req, res) => {
    const {
        params: { categoryId: categoryId },
    } = req
    const category = await Category.findByPk(categoryId);
    if (!category) {
        throw new NotFoundError('Category not found');
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
};

module.exports = { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory };
