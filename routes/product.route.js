const express = require('express')
const router = express.Router();
const {getProducts, getProductId, createProduct, deleteProduct, updateProduct} = require('../controller/product.controller.js');


router.get('/', getProducts );

router.get('/:id', getProductId);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

module.exports = router;