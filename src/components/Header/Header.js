import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cancelEditMode } from "../../redux/reducer";
import { setUser } from "../../redux/userReducer";
import Login from "../Login/Login";
import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false
    };
  }
  componentDidMount() {
    this.props.setUser();
  }
  handleToggle = () => {
    this.setState({
      isToggled: !this.state.isToggled
    });
  };
  render() {
    console.log(this.props);

    let { user, editing } = this.props;
    let { isToggled } = this.state;
    return (
      <header>
        <h1>{user && user.name}</h1>
        <img src="" alt="" />
        <nav className={`${isToggled ? "show" : ""}`}>
          {user && (
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
                  <NavLink to="/budget/monthly-budget" activeClassName="active">
                    Edit Budget
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          )}
        </nav>
        {this.props.location.pathname !== "/budget/monthly-budget" &&
          this.props.location.pathname !== "/budget/create" && (
            <NavLink
              to="/budget/create"
              className="add-item"
              activeClassName="active"
            >
              +
            </NavLink>
          )}
        <button className="menu" onClick={this.handleToggle}>
          {isToggled ? `x` : "☰"}
        </button>
      </header>
    );
  }
}
const mapStateToProps = state => {
  let { user } = state.user;
  let { editing } = state.budget;
  return {
    user,
    editing
  };
};
const mapDispatchToProps = {
  setUser,
  cancelEditMode
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
