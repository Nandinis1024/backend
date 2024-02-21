const express = require('express');
const router = express.Router();
const orderHistoryController = require('../../controllers/orders.controller');

router.post('/', orderHistoryController.createOrderHistory);

module.exports = router;