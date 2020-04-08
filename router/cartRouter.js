const express = require('express')
const router = express.Router()
const { cartController } = require('../controller')
const { getCart } = cartController


// const { productController } = require('../controller')
// const { 
//     getProduct, 
//     searchProduct, 
//     addProduct, 
//     editProduct,
//     deleteProduct} = productController
// semua alamat/url di API

// router.get('/get-product/', getProduct)
// router.get('/get-product/:orderBy', getProduct)

router.get('/get-cart/:id', getCart)

module.exports = router