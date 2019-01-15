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
  cancelEditMode
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
    this.props.setUser();
    setTimeout(() => {
      this.props.setBudgetItems(this.props.user.id);
    }, 800);
  }
  // HOC
  withBudgetData = (WrappedComponent, data) => {
    return <WrappedComponent data={data} />;
  };

  render() {
    let { budgetItems, user, editing } = this.props;
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
            {this.props.location.pathname == "/budget/create"
              ? addBudgetItem
              : this.props.location.pathname == "/budget/monthly-budget"
              ? budgetForm
              : mappedBudgetItems}
          </React.Fragment>
        )}
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
    editing,
    toggleColors
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
    editing,
    toggleColors
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
  cancelEditMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContainer);
