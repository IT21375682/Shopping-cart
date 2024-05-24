// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded); // Log decoded token for debugging

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not Authorized, user not found' });
      }
      console.log('User found:', req.user); // Log user for debugging
      next();
    } catch (error) {
      console.error('Error in protect middleware:', error);
      return res.status(401).json({ message: 'Not Authorized' });
    }
  } else {
    return res.status(401).json({ message: 'Not Authorized, No Token' });
  }
};

module.exports = protect;
