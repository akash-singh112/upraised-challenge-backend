const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token is required." });
    }

    const actualToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(actualToken, process.env.JWT_KEY);
    res.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
