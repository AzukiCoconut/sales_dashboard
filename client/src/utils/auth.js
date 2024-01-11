const jwt = require('jsonwebtoken'); // If you're using the User model inside authMiddleware

const signToken = (user) => {
  return jwt.sign({ data: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

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
