const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token invalide ou expiré ❌" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant ❌" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé (admin uniquement)" });
  }
};
console.log("protect:", typeof protect);   // doit afficher "function"
console.log("adminOnly:", typeof adminOnly); // doit afficher "function"


module.exports = { protect, adminOnly };
