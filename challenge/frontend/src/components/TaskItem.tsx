import { useContext, useState } from "react";
import { updateTask, deleteTask } from "../api/api";
import { AuthContext } from "../context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem = ({ task, setTasks }: Props) => {
  const { token } = useContext(AuthContext)!;
  const [isComplete, setIsComplete] = useState(task.is_complete);

  const handleToggleComplete = async () => {
    if (!token) return;
    try {
      const updatedTask = await updateTask(token, task.id, { isComplete: !isComplete });
      setIsComplete(updatedTask.data.is_complete);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    try {
      await deleteTask(token, task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div>
        <h3 className={`${isComplete ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={handleToggleComplete} className="mr-2 p-1 bg-green-500 text-white">
          {isComplete ? "Undo" : "Complete"}
        </button>
        <button onClick={handleDelete} className="p-1 bg-red-500 text-white">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
