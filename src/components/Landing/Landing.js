import React from "react";
import { NavLink } from "react-router-dom";
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
      </div>
    </section>
  );
};

export default Landing;
