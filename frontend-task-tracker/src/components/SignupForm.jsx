import { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEmail("");
    setPassword1("");
    setPassword2("");
    setErrors({});

    return () => {};
  }, []);

  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password1: Joi.string().required().min(8).label("Password1"),
    password2: Joi.string().required().min(8).label("Password2"),
  });

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate({ email, password1, password2 }, options);

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
      await userService.register({
        email,
        password1,
        password2,
      });

      toast.info("Confirmation email sent. Redirecting to Login Page...");
      setTimeout(() => {
        window.location = "/account";
      }, 5000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        setErrors(errors);
      }
    }
  };

  return (
    <>
      <h2>Signup</h2>
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <div className="error">{errors.password1}</div>
        </div>

        <div className="form-control">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Enter password again"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div className="error">{errors.password2}</div>
        </div>

        <input className="btn btn-block" type="submit" value="Signup" />
      </form>
    </>
  );
};

export default SignupForm;
