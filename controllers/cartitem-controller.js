const { Op } = require('sequelize');
const { NotFoundError, BadRequestError } = require('../errors');
const { CartItem, Cart } = require('../models/cart-model');
const Product = require('../models/product-model');

const getCartItem = async (req, res) => {
    const {
        user: { userId },
        params: { itemId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new NotFoundError('NO associated Cart was found');
    }
    const cartId = cart.id
    const item = await CartItem.findOne({ where: { id: itemId, cartId } });
    if (!item) {
        throw new NotFoundError('Cart item not found');
    }
    res.json(item);
};

const createCartItem = async (req, res) => {
    const {
        user: { userId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new NotFoundError('NO associated Cart was found');
    }
    const cartId = cart.id
    const productId = req.body.productId

    if (!productId) {
        throw new BadRequestError('You need to provide a product ID to create a cart item.');
    }
    const product = await Product.findByPk(productId);

    if (!product) {
        throw new NotFoundError('NO product was found with this id');
    }
    const existProduct = await CartItem.findOne({ where: { productId } });

    if (existProduct) {
        throw new BadRequestError('A cart item is already linked to this product. You can use the update option to change the quantity instead');
    }

    const newItem = await CartItem.create({ cartId, ...req.body });
    res.status(201).json(newItem);
};

const updateCartItem = async (req, res) => {
    const {
        body: { quantity },
        user: { userId },
        params: { itemId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new NotFoundError('NO associated Cart was found');
    }
    const cartId = cart.id

    const item = await CartItem.findOne({ where: { id: itemId, cartId } });
    if (!item) {
        throw new NotFoundError('Cart item not found');
    }

    if (!quantity) {
        throw new BadRequestError('Quantity is required to make an update');
    }
    await item.update({ quantity });

    res.json({ message: "Cart item updated successfully", item });
};

const deleteCartItem = async (req, res) => {
    const {
        user: { userId },
        params: { itemId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new NotFoundError('NO associated Cart was found');
    }
    const cartId = cart.id
    const item = await CartItem.findOne({ where: { id: itemId, cartId } });

    if (!item) {
        throw new NotFoundError('Cart item not found');
    }

    await item.destroy();
    res.json({ message: 'Cart item deleted successfully' });
};

const clearCartItems = async (req, res) => {
    const {
        user: { userId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new NotFoundError('Cart not found');
    }
    await CartItem.destroy({ where: { cartId: cart.id } });
    res.status(200).send({ message: "Cart was cleared successfully" });
};

module.exports = {
    getCartItem,
    createCartItem,
    updateCartItem,
    deleteCartItem,
    clearCartItems
};
