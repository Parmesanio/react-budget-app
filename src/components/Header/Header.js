import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../redux/userReducer";
import Login from "../Login/Login";
import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.setUser();
  }
  render() {
    let { user } = this.props;
    return (
      <header>
        <h1>{user && user.name}</h1>
        <img src="" alt="" />
        <nav>
          {user ? (
            <React.Fragment>
              <NavLink to={`/${user.id}`} activeClassName="active">
                Dashboard
              </NavLink>
              <NavLink to="/budget/create">Add</NavLink>
              <NavLink to="/budget/monthly-budget">Edit Budget</NavLink>
            </React.Fragment>
          ) : (
            <Login />
          )}
        </nav>
      </header>
    );
  }
}
const mapStateToProps = state => {
  let { user } = state.user;
  return {
    user
  };
};
const mapDispatchToProps = {
  setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
