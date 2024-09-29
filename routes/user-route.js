const express = require('express')
const router = express.Router()
const { register,
    login,
    logout,
    getUser,
    deleteUser,
    updateUser } = require('../controllers/user-controller')
const authenticateJWT = require('../middleware/authentication');

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticateJWT, logout);

router.get('/', authenticateJWT, getUser);
router.patch('/', authenticateJWT, updateUser);
router.delete('/', authenticateJWT, deleteUser);

module.exports = router
