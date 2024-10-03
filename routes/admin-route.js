const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser } = require('../controllers/admin-controller')


router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router
