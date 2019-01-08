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
  editItem
} from "../../redux/reducer";
import { setUser, setBudgetAmount } from "../../redux/userReducer";
import BudgetItem from "./BudgetItem/BudgetItem";
import AddBudgetItem from "../AddBudgetItem/AddBudgetItem";
import BudgetForm from "../BudgetForm/BudgetForm";
import "./budgetcontainer.scss";

class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("cdm fired", this.props.user);
    this.props.setUser();
    setTimeout(() => {
      this.props.setBudgetItems(this.props.user.id);
    }, 500);
  }
  // HOC
  withBudgetData = (WrappedComponent, data) => {
    return <WrappedComponent data={data} />;
  };

  render() {
    let {
      budgetItems,
      user,
      setBudgetAmount,
      handleChange,
      budget
    } = this.props;
    console.log("budgetcontainer", this.props);
    let addBudgetItem = this.withBudgetData(AddBudgetItem, { ...this.props });
    let budgetForm = this.withBudgetData(BudgetForm, { ...this.props });
    let pieChart = this.withBudgetData(PieChart, { ...this.props });
    let mappedBudgetItems =
      budgetItems &&
      budgetItems.map(item => (
        <BudgetItem
          itemTitle={item.title}
          itemAmount={item.amount}
          itemId={item.id}
          {...this.props}
        />
      ));
    return (
      <div className="budget-container">
        {user && !user.budget ? (
          budgetForm
        ) : budgetItems && budgetItems.length == 0 ? (
          addBudgetItem
        ) : (
          <React.Fragment>
            {budgetItems && pieChart}
            {user && (
              <div className="controls">
                <NavLink to={`/${user.id}`} activeClassName="active">
                  Dashboard
                </NavLink>
                <NavLink to="/budget/create">Add</NavLink>
                <NavLink to="/budget/monthly-budget">Edit Budget</NavLink>
              </div>
            )}
            {this.props.location.pathname == "/budget/create"
              ? addBudgetItem
              : this.props.location.pathname == "/budget/monthly-budget"
              ? budgetForm
              : mappedBudgetItems}
          </React.Fragment>
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
    selectedColor,
    budget,
    editing
  } = state.budget;
  let { user } = state.user;
  return {
    budgetItems,
    colors,
    title,
    amount,
    budget,
    selectedColor,
    user,
    editing
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
  editItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContainer);
