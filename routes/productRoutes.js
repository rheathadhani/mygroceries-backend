const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController');

router.get('/products', productsController.getAllProducts);
//router.post('/products', productsController.addProduct);
router.get('/products/:productID', productsController.getProductByID);

module.exports = router;
