const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: decoded.id }; // now req.user._id is available
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;