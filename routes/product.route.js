const express = require('express')
const router = express.Router();
const {getProducts, getProductId, createProduct, deleteProduct, updateProduct} = require('../controller/product.controller.js');


router.post('/getProduct', getProducts );

router.post('/getProductById', getProductId); 

router.post('/createProduct', createProduct);

router.post('/deleteProduct', deleteProduct);

router.post('/updateProduct', updateProduct);

module.exports = router;
