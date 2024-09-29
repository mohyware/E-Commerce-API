const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/user-model')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { userName: user.userName }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { userName: user.userName }, token })
}
const getUser = async (req, res) => {
    const {
        user: { userId }
    } = req
    const user = await User.findByPk(userId);
    res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res) => {
    const {
        user: { userId }
    } = req
    const user = await User.destroy({ where: { id: userId } });
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" })

}
const updateUser = async (req, res, next) => {
    const {
        user: { userId }
    } = req
    try {
        const user = await User.findByPk(userId);

        await user.update({ ...req.body });

        res.status(StatusCodes.OK).json({ message: "User updated successfully", user });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    logout,
    getUser,
    deleteUser,
    updateUser,
}
