const express = require('express')
const router = express.Router();
const {getProducts, getProductId, searchProduct, createProduct, deleteProduct, updateProduct} = require('../controller/product.controller.js');
const upload = require('../utils/multer'); // we’ll define this next


router.post('/getProduct', upload.none(),getProducts );

router.post('/getProductById', getProductId); 

router.post('/searchProduct', upload.none(),searchProduct);

router.post('/createProduct', upload.none(),createProduct);

router.post('/deleteProduct', upload.none(),deleteProduct);

router.post('/updateProduct', upload.none(),updateProduct);

module.exports = router;
