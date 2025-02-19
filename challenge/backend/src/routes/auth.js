import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);
  res.json({ user: result.rows[0] });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

  if (user.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.rows[0].id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
