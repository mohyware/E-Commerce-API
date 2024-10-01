const { NotFoundError, BadRequestError } = require('../errors');
const { Cart, CartItem } = require('../models/cart-model');
const Product = require('../models/product-model');

const createCart = async (req, res) => {
    const {
        user: { userId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new BadRequestError('This user already has an associated cart.');
    }

    const newCart = await Cart.create({ userId });
    res.status(201).json(newCart);
};

const getCart = async (req, res) => {
    const {
        user: { userId },
    } = req;

    const cart = await Cart.findOne({
        where: { userId }
    });

    if (!cart) {
        throw new NotFoundError('No associated Cart was found');
    }

    const cartId = cart.id;

    const count = await CartItem.count({ where: { cartId } });

    if (!count) {
        throw new NotFoundError('No items were found for this cart');
    }

    const cartItems = await CartItem.findAll({
        where: { cartId },
    });

    let totalPrice = 0;

    const detailedCartItems = await Promise.all(cartItems.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        const itemTotalPrice = item.quantity * product.price;
        totalPrice += itemTotalPrice;
        return {
            ...item.toJSON(),
            product,
            totalPrice: itemTotalPrice,
        };
    }));

    res.status(200).json({ cart, totalPrice, cartItems: detailedCartItems });
};


const deleteCart = async (req, res) => {
    const {
        user: { userId },
    } = req
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        throw new NotFoundError('NO associated Cart was found');
    }
    const cartId = cart.id
    const result = await Cart.destroy({ where: { id: cartId } });

    await CartItem.destroy({ where: { cartId } });
    res.status(200).send({ message: 'Cart item deleted successfully' });
};

module.exports = {
    createCart,
    getCart,
    deleteCart,
};
