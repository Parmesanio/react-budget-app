import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cancelEditMode } from "../../redux/reducer";
import { setUser, logout, handleMessage } from "../../redux/userReducer";
import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false
    };
  }
  handleToggle = () => {
    this.setState({
      isToggled: !this.state.isToggled
    });
  };
  render() {
    let { user, editing, logout, logoutMessage } = this.props;
    let { isToggled } = this.state;
    return (
      <header>
        <div>
          <h1><Link to="/">Budget Tracker</Link></h1>
          <img src="" alt="" />
          <div
            className={`${isToggled ? "show-overlay" : "hide-overlay"}`}
            onClick={this.handleToggle}
          />
          <nav className={`${isToggled ? "show" : ""}`}>
            {user ? (
              <div className="controls">
                {editing ? (
                  <React.Fragment>
                    <button
                      onClick={() =>
                        this.props.cancelEditMode(this.props.history, user.id)
                      }
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavLink to={`/${user.id}`} activeClassName="active">
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/budget/monthly-budget"
                      activeClassName="active"
                    >
                      Edit Budget
                    </NavLink>
                    <button onClick={() => logout(this.props.history)}>
                      Log out
                    </button>
                  </React.Fragment>
                )}
              </div>
            ) : (
              <div className="controls">
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/register">Register</NavLink>
              </div>
            )}
          </nav>
          <button className="menu" onClick={this.handleToggle}>
            {isToggled ? `x` : "☰"}
          </button>
        </div>
        {logoutMessage && <p className="logoutMessage">{logoutMessage}</p>}
      </header>
    );
  }
}
const mapStateToProps = state => {
  let { user, logoutMessage } = state.user;
  let { editing } = state.budget;
  return {
    user,
    editing,
    logoutMessage
  };
};
const mapDispatchToProps = {
  setUser,
  cancelEditMode,
  logout,
  handleMessage
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
