import { useState } from "react";
import Joi from "joi-browser";
import { saveTask } from "../services/taskService";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [reminder, setReminder] = useState(false);
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    detail: Joi.string().label("Detail"),
    reminder: Joi.boolean().label("Reminder"),
  });

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate({ title, detail, reminder }, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    setTitle("");
    setDetail("");
    setReminder(false);

    //Call server
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const { data: newTask } = await saveTask({ title, detail, reminder });
      onAdd(newTask);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        setErrors(errors);
      }
    }
  };

  return (
    <>
      <h2>Add Task</h2>
      <div className="error">{errors.non_field_errors}</div>

      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="error">{errors.title}</div>
        </div>

        <div className="form-control">
          <label>Detail</label>
          <input
            type="text"
            placeholder="Add Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <div className="error">{errors.detail}</div>
        </div>

        <div className="form-control form-control-check">
          <label>Set reminder</label>
          <input
            type="checkbox"
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
          <div className="error">{errors.reminder}</div>
        </div>

        <input className="btn btn-block" type="submit" value="Save Task" />
      </form>
    </>
  );
};

export default TaskForm;
