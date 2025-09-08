import pool from "../config/db";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All details must be filled up" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await pool.query(
      "Select*from users where email = $1",
      [email]
    );

    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server not wokring for registeration " + error });
  }
};
