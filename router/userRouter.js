const express = require('express')
const router = express.Router()
const { userController } = require('../controller/index')
// semua alamat/url di API

router.get('/getUsers', userController.getAllUsers)
router.get('/getUserById/:id', userController.getUserById)
router.get('/search-name', userController.searchByUsername)
router.get('/login', userController.login)
router.get('/search-by-role', userController.searchByRole)

module.exports = router