const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  try {
    const { streetAddress, district, phone, paymentMethod, cartIds } = req.body;
    const newOrder = new Order({
      user: req.user._id,
      address: { streetAddress, district, phone }, // Address is structured as a single object
      paymentMethod,
      cart: cartIds,
    });
    
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { placeOrder };
