import React, { Component } from "react";
import PieChart from "./PieChart/PieChart";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  setBudgetItems,
  handleCreate,
  handleChange,
  handleDelete,
  editMode,
  editItem,
  cancelEditMode,
  onlineMode
} from "../../redux/reducer";
import {
  setUser,
  setBudgetAmount,
  createUser,
  logIn,
  handleLoginForm
} from "../../redux/userReducer";
import BudgetItem from "./BudgetItem/BudgetItem";
import AddBudgetItem from "../AddBudgetItem/AddBudgetItem";
import BudgetForm from "../BudgetForm/BudgetForm";
import "./budgetcontainer.scss";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import axios from "axios";

class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.match.url !== "/login" &&
      this.props.match.url !== "/register" &&
      !this.props.user.guest &&
      this.props.setUser(this.props.history);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.props.setBudgetItems(this.props.user.id);
    }
  }
  // HOC
  withBudgetData = (WrappedComponent, data) => {
    return <WrappedComponent data={data} />;
  };
  render() {
    let { budgetItems, user, dates } = this.props;
    console.log("budgetcontainer", this.props);
    let login = this.withBudgetData(Login, { ...this.props });
    let signup = this.withBudgetData(Signup, { ...this.props });
    let addBudgetItem = this.withBudgetData(AddBudgetItem, { ...this.props });
    let budgetForm = this.withBudgetData(BudgetForm, { ...this.props });
    let pieChart = this.withBudgetData(PieChart, { ...this.props });
    let mappedBudgetItems =
      budgetItems &&
      budgetItems.map(item => (
        <BudgetItem
          key={item.id}
          itemTitle={item.title}
          itemAmount={item.amount}
          itemId={item.id}
          itemSpent={item.spent}
          itemColor={item.color}
          {...this.props}
        />
      ));
    let mappedDates = dates && dates.map(date => {
      return <option key={date.to_char}>{date.to_char}</option>
    })
    return (
      <div className="budget-container">
        {user ? (
          user.budget == 0 ? (
            <div className="step">
              <h1>Step 1:</h1>
              {budgetForm}
            </div>
          ) : budgetItems == null || budgetItems.length == 0 ? (
            <div className="step">
              <h1>Step 2:</h1>
              {addBudgetItem}
            </div>
          ) : (
                <React.Fragment>
                  {budgetItems && pieChart}
                  {this.props.location.pathname == "/budget/create"
                    ? addBudgetItem
                    : this.props.location.pathname == "/budget/monthly-budget"
                      ? budgetForm
                      : <React.Fragment><div className="select-container"><select onChange={(e) => {
                        let dateArr = e.target.value.split(' ');
                        this.props.setBudgetItems(this.props.user.id, dateArr[0], dateArr[1])
                      }}>{mappedDates}</select></div>{mappedBudgetItems}</React.Fragment>}
                </React.Fragment>
              )
        ) : this.props.location.pathname == "/login" ? (
          login
        ) : this.props.location.pathname == "/register" ? (
          signup
        ) : (
                "Loading..."
              )}
        {!this.props.location.pathname.includes("/budget") &&
          !this.props.location.pathname.includes("/login") &&
          !this.props.location.pathname.includes("/register") &&
          navigator.onLine && (
            <NavLink
              to="/budget/create"
              className="add-item"
              activeClassName="active"
            >
              +
            </NavLink>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let {
    budgetItems,
    colors,
    title,
    amount,
    spent,
    selectedColor,
    budget,
    editing,
    toggleColors,
    online,
    dates
  } = state.budget;
  let { user, username, password } = state.user;
  return {
    budgetItems,
    colors,
    title,
    amount,
    spent,
    budget,
    selectedColor,
    user,
    editing,
    toggleColors,
    username,
    password,
    online,
    dates
  };
};
const mapDispatchToProps = {
  setBudgetItems,
  handleCreate,
  handleChange,
  setUser,
  setBudgetAmount,
  handleDelete,
  editMode,
  editItem,
  cancelEditMode,
  createUser,
  logIn,
  handleLoginForm,
  onlineMode
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContainer);
