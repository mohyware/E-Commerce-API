const express = require('express')
const router = express.Router()
const {
    getAllCustomers,
    getAllAdmins,
    getUser,
    deleteUser,
    updateUser } = require('../controllers/admin-controller')

router.get('/', getAllCustomers);
router.get('/admins', getAllAdmins);
router.get('/:userId', getUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router
