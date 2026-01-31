import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "../components/AddTaskModal";
import TaskCard from "../components/TaskCard";
import "./Home.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">Task Manager</h1>
            <p className="welcome-text">Welcome, {user?.name || "User"}!</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <div className="content-wrapper">
          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon total">📋</div>
              <div className="stat-info">
                <p className="stat-label">Total Tasks</p>
                <p className="stat-value">{tasks.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-info">
                <p className="stat-label">Pending</p>
                <p className="stat-value">{pendingTasks}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon completed">✅</div>
              <div className="stat-info">
                <p className="stat-label">Completed</p>
                <p className="stat-value">{completedTasks}</p>
              </div>
            </div>
          </div>

          {/* Add Task Button */}
          <div className="add-task-section">
            <button
              onClick={() => setIsModalOpen(true)}
              className="add-task-button"
            >
              <span className="plus-icon">+</span>
              Add New Task
            </button>
          </div>

          {/* Tasks Section */}
          <div className="tasks-section">
            <h2 className="section-title">Your Tasks</h2>
            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p className="empty-text">No tasks yet!</p>
                <p className="empty-subtext">
                  Click "Add New Task" to create your first task
                </p>
              </div>
            ) : (
              <div className="tasks-grid">
                {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Task Modal */}
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Home;
