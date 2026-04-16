const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("No token");
  }

  // ✅ Handle "Bearer <token>"
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Ensure required fields exist
    if (!decoded.id) {
      return res.status(401).json("Invalid token payload");
    }

    // 🔥 Normalize user object (important for your app)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      isAdmin: decoded.isAdmin || false,
      name: decoded.name || "",
    };

    next();
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};