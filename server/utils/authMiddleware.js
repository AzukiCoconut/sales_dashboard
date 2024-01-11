const jwt = require('jsonwebtoken');
const User = require('../models/User');

// sign token this function will receive a user object and return a token for that user
const signToken = (user) => {
  return jwt.sign({ data: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// auth middleware this function will receive the request object as a parameter
const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  // if there is no token, return the request object as is
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.data;
    } catch (error) {
      console.log('Invalid token:', error);
    }
  }

  return req;
};

module.exports = { signToken, authMiddleware };
