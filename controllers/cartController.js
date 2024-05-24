const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body; // Default quantity to 1 if not provided
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    } else {
      cart = new Cart({ user: req.user._id, products: [{ product: productId, quantity }] });
      await cart.save();
    }
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
