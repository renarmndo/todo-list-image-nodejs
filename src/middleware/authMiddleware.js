import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      success: false,
      msg: "Token tidak ditemukan",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JSON_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      msg: "Token tidak valid",
    });
  }
};
