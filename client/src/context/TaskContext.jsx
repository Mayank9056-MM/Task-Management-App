import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.data);
  };

  const addTask = async (title) => {
    await api.post("/tasks", { title });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/delete/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    const res= await api.patch(`/tasks/toggle/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
