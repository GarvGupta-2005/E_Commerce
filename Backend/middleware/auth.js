import express from 'express';
import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    req.body.userId = decoded.id; // Safely inject userId
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authUser;