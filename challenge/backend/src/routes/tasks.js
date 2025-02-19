import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
  res.json(tasks.rows);
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;
  const newTask = await pool.query("INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [title, description, userId]);
  res.json(newTask.rows[0]);
});

router.put("/:id", async (req, res) => {
  const { title, description, isComplete } = req.body;
  const updatedTask = await pool.query("UPDATE tasks SET title=$1, description=$2, is_complete=$3 WHERE id=$4 RETURNING *", [title, description, isComplete, req.params.id]);
  res.json(updatedTask.rows[0]);
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
  res.json({ message: "Task deleted" });
});

export default router;
