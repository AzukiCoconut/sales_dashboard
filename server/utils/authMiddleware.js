const jwt = require("jsonwebtoken");
require("dotenv").config();

// sign token this function will receive a user object and return a token for that user
const signToken = ({ name, email, _id, role, occupation }) => {
  const payload = { name, email, _id, role, occupation };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// auth middleware this function will receive the request object as a parameter
const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || "";
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  // if there is no token, return the request object as is
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.data;
      //Checks if user have role
      if (decoded.data.role) {
        req.user.role = decoded.data.role;
      }
    } catch (error) {
      console.log("Invalid token:", error);
    }
  }

  return req;
};
//Checks if user have role and if it is access allowed if not return 401 and message 'Unauthorized'
const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user && req.user.role === requiredRole) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = { signToken, authMiddleware, roleMiddleware };
