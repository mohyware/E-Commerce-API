const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser } = require('../controllers/admin-controller')
const authenticateJWT = require('../middleware/authentication');

router.get('/', authenticateJWT, getAllUsers);
router.get('/:userId', authenticateJWT, getUser);
router.patch('/:userId', authenticateJWT, updateUser);
router.delete('/:userId', authenticateJWT, deleteUser);

module.exports = router
