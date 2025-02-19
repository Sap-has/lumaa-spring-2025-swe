import { useEffect, useState, useContext } from "react";
import { getTasks } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const TaskList = () => {
  const { token } = useContext(AuthContext)!;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (token) {
      getTasks(token)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Your Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} setTasks={setTasks} />)
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
