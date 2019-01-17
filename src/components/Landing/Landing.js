import React from "react";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import "./landing.scss";

const Landing = props => {
  return (
    <section className="landing">
      <div className="landing-container">
        <h1>Track your budget.</h1>
        <div className="landing-buttons">
          <Login />
          <Signup />
        </div>
      </div>
    </section>
  );
};

export default Landing;
