import React from "react";

const Login = props => {
  let { logIn, history, username, password, handleLoginForm } = props.data;
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label>Username:</label>
      <input name="username" onChange={e => handleLoginForm(e)} />
      <label>Password:</label>
      <input
        name="password"
        onChange={e => handleLoginForm(e)}
        type="password"
      />
      <button onClick={() => logIn(username, password, history)}>Log In</button>
    </form>
  );
};

export default Login;
