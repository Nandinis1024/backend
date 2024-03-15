const express = require('express');
const ProductFeatures = require('../../models/productFeatures.model');
const isAdmin = require('../../middlewares/admin');
const featuresController = require('../../controllers/features.controller');
const productFeaturesSchema = require('../../validations/features.validation');
const {validateCsrfToken} = require('../../middlewares/csrf');
const validateProducts = require('../../middlewares/validateProducts');

const router = express.Router();

router.post('/createFeatures', isAdmin, validateProducts(productFeaturesSchema), validateCsrfToken, featuresController.createFeatures);
router.get('/getFeatures', featuresController.getFeatures);
  
module.exports = router;