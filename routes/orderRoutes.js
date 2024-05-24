const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, placeOrder);

module.exports = router;
