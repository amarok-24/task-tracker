import { useState, useEffect } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEmail("");
    setPassword("");
    setErrors({});

    return () => {};
  }, []);

  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  });

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate({ email, password }, options);

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

    //Call server
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      await auth.login(email, password);
      window.location = "/"; // Since history.push does not cause a full reload of app
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        setErrors(errors);
      }
    }
  };

  return (
    <>
      <h2>Login</h2>
      <div className="error">{errors.non_field_errors}</div>

      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="error">{errors.email}</div>
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="error">{errors.password}</div>
        </div>

        <input className="btn btn-block" type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
