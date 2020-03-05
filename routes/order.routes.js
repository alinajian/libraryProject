const router = require('express').Router();
const controller = require('../controllers/order.controller');

// List of orders
router.get('/', controller.getOrders);
//Submit new order
router.post('/', controller.submitNewOrder);



module.exports = router;