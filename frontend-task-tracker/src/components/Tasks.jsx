import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import auth from "../services/authService";
import { getTasks, saveTask, deleteTask } from "../services/taskService";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Header from "./Header";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    getTasks_();
  }, []);

  const getTasks_ = async () => {
    const { data: tasksFromServer } = await getTasks();
    setTasks(tasksFromServer);
  };

  const addTasktoState = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const onDelete = async (taskId) => {
    const originalTasks = [...tasks];

    setTasks(tasks.filter((task) => task.pk !== taskId));

    try {
      await deleteTask(taskId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This task has already been deleted");
      setTasks(originalTasks);
    }
  };

  const onToggle = async (taskId) => {
    const originalTasks = [...tasks];

    const updatedTasks = tasks.map((task) =>
      task.pk === taskId ? { ...task, reminder: !task.reminder } : task
    );

    setTasks(updatedTasks);

    try {
      await saveTask(updatedTasks.find((task) => task.pk === taskId));
    } catch (ex) {
      setTasks(originalTasks);
    }
  };

  const onLogout = async () => {
    await auth.logout();
    localStorage.removeItem("isLoggedIn");
    window.location = "/account";
  };

  return (
    <>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onLogout={onLogout}
      />

      {showAddTask && <TaskForm onAdd={addTasktoState} />}

      {tasks.length > 0
        ? tasks.map((task) => (
            <Task
              key={task.pk}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))
        : "No Tasks Added"}
    </>
  );
};

export default Tasks;
