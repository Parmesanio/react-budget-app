import React from "react";
import "./login-signup.scss";

const Login = props => {
  let { logIn, history, username, password, handleLoginForm } = props.data;
  return (
    <div className="login-signup-container">
      <form className="login-form" onSubmit={e => e.preventDefault()}>
        <label>Username:</label>
        <input name="username" onChange={e => handleLoginForm(e)} />
        <label>Password:</label>
        <input
          name="password"
          onChange={e => handleLoginForm(e)}
          type="password"
        />
        <button onClick={() => logIn(username, password, history)}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
