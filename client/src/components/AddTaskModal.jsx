import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import "./AddTaskModal.css";

const AddTaskModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setLoading(true);
    try {
      await addTask(title);
      setTitle("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Task</h2>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;