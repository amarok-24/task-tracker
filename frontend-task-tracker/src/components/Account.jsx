import { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Account = ({ isLoggedIn }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const onToggleForm = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
  };

  if (isLoggedIn === true) return <Redirect to="/" />;

  return (
    <>
      {isLoginForm ? (
        <>
          <LoginForm />
          New User?{" "}
          <button onClick={onToggleForm} className="btn btn-link">
            Create a new account
          </button>
        </>
      ) : (
        <>
          <SignupForm />
          Already have an account?{" "}
          <button onClick={onToggleForm} className="btn btn-link">
            Login here
          </button>
        </>
      )}
    </>
  );
};

export default Account;
