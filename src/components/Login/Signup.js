import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null
    };
  }
  handleUserChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    let { createUser, history } = this.props.data;
    return (
      <div className="login-signup-container">
        <form className="signup-form" onSubmit={e => e.preventDefault()}>
          <p>
            <NavLink exact to="/">
              Home{" "}
            </NavLink>
            >
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </p>
          <br />
          <label>Username:</label>
          <input name="username" onChange={e => this.handleUserChange(e)} />
          <label>Email:</label>
          <input
            name="email"
            onChange={e => this.handleUserChange(e)}
            type="email"
          />
          <label>Password:</label>
          <input
            name="password"
            onChange={e => this.handleUserChange(e)}
            type="password"
          />
          <button
            onClick={() =>
              createUser(
                this.state.username,
                this.state.email,
                this.state.password,
                history
              )
            }
          >
            Start Budgeting
          </button>
          <p>
            Already have an account?{" "}
            <NavLink activeClassName="active" to="/login">
              Log In
            </NavLink>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
