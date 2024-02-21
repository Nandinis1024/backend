const express = require('express');
const isAdmin = require('../../middlewares/admin');
const productController = require('../../controllers/product.controller');

const router = express.Router();

const mapValidityOptionTitle = (validityInDays) => {
  let validityOptionTitle = '';
  if (validityInDays == 30) {
    validityOptionTitle = '1 month';
  } else if (validityInDays == 90) {
    validityOptionTitle = '3 months';
  } else if (validityInDays == 365) {
    validityOptionTitle = '1 year';
  } else {
    validityOptionTitle = 'Custom';
  }
  return validityOptionTitle;
};


router.post('/createProducts', isAdmin, productController.createProduct);
router.post('/userId', productController.findUserId);
router.get('/getProducts', productController.getProducts);
router.get('/getProductsPricing', productController.getProductsPricing);
router.get('/getProductsValidity', productController.getProductsValidity);
router.patch('/deleteProduct/:productId', productController.deleteProduct);
router.patch('/visibilityProduct/:productId', productController.changeVisibilityProduct);
router.post('/createCheckoutSession', productController.createCheckoutSession);

module.exports = router;
