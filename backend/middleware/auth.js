const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization || "";

  if (!process.env.JWT_SECRET) {
    return res.status(500).json("JWT secret not configured");
  }

  if (!token) {
    return res.status(401).json("No token");
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json("Invalid token payload");
    }

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
