import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokem.js";

const options = {
  maxAge: 1000 * 60 * 60 * 24,

  httpOnly: true,

  secure: true,

  sameSite: "strict",
};

export const register = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    if (!name || !email || !password || !address) {
      return res.status(400).json({ message: "All details must be filled up" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const insertQuery = `
      INSERT INTO users (name, email, password,address) 
      VALUES ($1, $2, $3,$4) 
      RETURNING id, name, email,address, created_at, updated_at
    `;

    const newUser = await pool.query(insertQuery, [
      name,
      email,
      hashPass,
      address,
    ]);
    const user = newUser.rows[0];
    const token = generateToken(user.id);

    return res
      .status(201)
      .cookie("token", token, options)
      .json({ message: `Account Created!!!`, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server not wokring for registeration " + error });
  }
};
