const express = require('express');
const isAdmin = require('../../middlewares/admin');
const {attachCsrfToken, validateCsrfToken} = require('../../middlewares/csrf');
const productController = require('../../controllers/product.controller');
const validateProducts = require('../../middlewares/validateProducts');
const productSchema = require('../../validations/product.validation');


const router = express.Router();


router.get('/csrf-token', attachCsrfToken, productController.getCsrfToken);
router.post('/createProducts', isAdmin, validateProducts(productSchema), validateCsrfToken, productController.createProduct);
router.post('/userId', productController.findUserId);
router.get('/getProducts', productController.getProducts);
router.get('/getProductsPricing', productController.getProductsPricing);
router.get('/getProductsValidity', productController.getProductsValidity);
router.patch('/deleteProduct/:productId', isAdmin, validateCsrfToken, productController.deleteProduct);
router.patch('/visibilityProduct/:productId', isAdmin, validateCsrfToken, productController.changeVisibilityProduct);
router.post('/createCheckoutSession', validateCsrfToken, productController.createCheckoutSession);

module.exports = router;
