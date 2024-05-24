// backend/routes/cartRoutes.js
const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/', protect, removeFromCart);

module.exports = router;
