const User = require('../models/user-model')
const { UnauthenticatedError } = require('../errors')

const adminAuth = async (req, res, next) => {
    const {
        user: { userId },
    } = req;
    const user = await User.findByPk(userId);

    if (user.userRole !== 'Admin') {
        return UnauthenticatedError('Access denied. Admins only.');
    }

    next()
}

module.exports = adminAuth
