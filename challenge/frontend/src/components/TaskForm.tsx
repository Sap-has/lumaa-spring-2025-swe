import { useState, useContext } from "react";
import { createTask } from "../api/api";
import { AuthContext } from "../context/AuthContext";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const TaskForm = ({ setTasks }: Props) => {
  const { token } = useContext(AuthContext)!;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const newTask = await createTask(token, title, description);
      setTasks((prev) => [...prev, newTask.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <h2 className="text-xl mb-2">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white w-full">Create Task</button>
    </form>
  );
};

export default TaskForm;
