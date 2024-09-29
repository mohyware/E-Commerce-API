const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')
const User = require('../models/user-model')

const getAllUsers = async (req, res) => {
    const users = await User.findAll({ where: { role: "User" } });
    if (!users) {
        throw new NotFoundError('No users was found')
    }
    res.status(StatusCodes.CREATED).json({ users, "count": { count: users.length } })
}

const getUser = async (req, res) => {
    const {
        params: { userId: userId },
    } = req
    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError('User not found')
    }
    res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res) => {
    const {
        params: { userId: userId },
    } = req
    const user = await User.destroy({ where: { id: userId } });
    if (!user) {
        throw new NotFoundError('User not found')
    }
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" })

}
const updateUser = async (req, res, next) => {
    const {
        params: { userId: userId },
    } = req
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('User not found')
        }

        await user.update({ ...req.body });

        res.status(StatusCodes.OK).json({ message: "User updated successfully", user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    getAllUsers
}
