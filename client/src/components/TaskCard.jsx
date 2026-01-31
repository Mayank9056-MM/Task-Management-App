import { useTasks } from "../context/TaskContext";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const { deleteTask, toggleTask } = useTasks();

  const handleToggle = async () => {
    try {
      await toggleTask(task._id);
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await deleteTask(task._id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  return (
    <div
      className={`task-card ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-content">
        <div className="task-checkbox-wrapper">
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={handleToggle}
            className="task-checkbox"
            id={`task-${task._id}`}
          />
          <label htmlFor={`task-${task._id}`} className="checkbox-label">
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="task-details">
          <p
            className={`task-title ${task.status === "completed" ? "line-through" : ""}`}
          >
            {task.title}
          </p>
          <p className="task-date">
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={handleDelete}
          className="delete-button"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
