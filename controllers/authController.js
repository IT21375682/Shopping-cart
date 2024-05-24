// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Consistency: Use 'id'
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Consistency: Use 'id'
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };
