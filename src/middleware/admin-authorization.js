const User = require('../models/user-model')
const { UnauthorizedError } = require('../errors')

const adminAuth = async (req, res, next) => {
    const {
        user: { userId },
    } = req;
    const user = await User.findByPk(userId);

    if (user.role !== 'Admin') {
        throw new UnauthorizedError('Access denied. Admins only.');
    } else {
        next()
    }
}

module.exports = adminAuth
