import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { handleGuest } from "../../redux/userReducer";
import "./landing.scss";

const Landing = props => {
  return (
    <section className="landing">
      <div className="landing-container">
        <h1>Track your budget.</h1>
        <div className="landing-buttons">
          <NavLink to="/login">Log In</NavLink>
          <NavLink className="signup" to="/register">
            Sign up
          </NavLink>
        </div>
        <br />
        <button
          className="guest-button"
          onClick={() => props.handleGuest(props.history, window.setTimeout)}
        >
          Sign in as Guest
        </button>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  handleGuest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
