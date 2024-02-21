const express = require('express');
const ProductFeatures = require('../../models/productFeatures.model');
const isAdmin = require('../../middlewares/admin');
const featuresController = require('../../controllers/features.controller');

const router = express.Router();

router.post('/createFeatures', isAdmin , featuresController.createFeatures);
router.get('/getFeatures', featuresController.getFeatures);
  
module.exports = router;