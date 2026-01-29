import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Authentication Failed" });
  }
};
