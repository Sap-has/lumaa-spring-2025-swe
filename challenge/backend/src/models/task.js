import pool from "../config/db.js";

// Get all tasks for a user
export const getTasksByUser = async (userId) => {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
  return result.rows;
};

// Create a new task
export const createTask = async (title, description, userId) => {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId]
  );
  return result.rows[0];
};

// Update a task (mark complete, edit text)
export const updateTask = async (taskId, title, description, isComplete) => {
  const result = await pool.query(
    "UPDATE tasks SET title=$1, description=$2, is_complete=$3 WHERE id=$4 RETURNING *",
    [title, description, isComplete, taskId]
  );
  return result.rows[0];
};

// Delete a task
export const deleteTask = async (taskId) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
  return { message: "Task deleted" };
};
