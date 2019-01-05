import React, { Component } from "react";
import PieChart from "./PieChart/PieChart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setBudgetItems,
  handleCreate,
  handleChange
} from "../../redux/reducer";
import { setUser, setBudgetAmount } from "../../redux/userReducer";
import BudgetItem from "./BudgetItem/BudgetItem";
import AddBudgetItem from "../AddBudgetItem/AddBudgetItem";

class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.match.params.id &&
      this.props.setBudgetItems(this.props.match.params.id);
    this.props.setUser();
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
    let mappedBudgetItems =
      budgetItems &&
      budgetItems.map(item => <BudgetItem {...item} {...this.props.user} />);
    return (
      <div>
        {user && !user.budget ? (
          <form onSubmit={e => e.preventDefault()}>
            <input
              onChange={handleChange}
              name="budget"
              type="number"
              placeholder="Monthly Budget"
            />
            <button onClick={() => setBudgetAmount(budget)}>Submit</button>
          </form>
        ) : budgetItems && budgetItems.length == 0 ? (
          addBudgetItem
        ) : this.props.match.path == "/:id" ? (
          <React.Fragment>
            {budgetItems && (
              <PieChart budgetItems={budgetItems} {...this.props.user} />
            )}
            {mappedBudgetItems}
          </React.Fragment>
        ) : (
          this.props.match.path == "/budget/create" && addBudgetItem
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
    budget
  } = state.budget;
  let { user } = state.user;
  return {
    budgetItems,
    colors,
    title,
    amount,
    budget,
    selectedColor,
    user
  };
};
const mapDispatchToProps = {
  setBudgetItems,
  handleCreate,
  handleChange,
  setUser,
  setBudgetAmount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContainer);
