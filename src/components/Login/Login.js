import React from "react";
import { NavLink } from "react-router-dom";
import "./login-signup.scss";

const Login = props => {
  let { logIn, history, username, password, handleLoginForm } = props.data;
  return (
    <div className="login-signup-container">
      <form className="login-form" onSubmit={e => e.preventDefault()}>
        <p>
          <NavLink exact to="/">
            Home{" "}
          </NavLink>
          >{" "}
          <NavLink activeClassName="active" to="/login">
            Log In
          </NavLink>
        </p>
        <br />
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
        <p>
          Don't have an account?{" "}
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
