import pool from "../config/db.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorised access" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);

    const existUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      decoded.userId,
    ]);
    if (existUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = existUser.rows[0];
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Issue ", error: error.message });
  }
};
