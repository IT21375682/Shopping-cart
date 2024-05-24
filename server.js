// backend/server.js
const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Import and apply the authMiddleware
const protect = require('./middlewares/authMiddleware');

// Apply authMiddleware to the cart routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', protect, cartRoutes);

// Other route handlers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', protect, orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
