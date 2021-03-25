import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.pk)}
    >
      <h3>
        {task.title}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.pk)}
        />
      </h3>
      <p>{task.detail}</p>
    </div>
  );
};

export default Task;
