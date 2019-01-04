import React, { Component } from "react";
import PieChart from "./PieChart/PieChart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setBudgetItems } from "../../redux/reducer";
import { setUser } from "../../redux/userReducer";
import BudgetItem from "./BudgetItem/BudgetItem";
import AddBudgetItem from "../AddBudgetItem/AddBudgetItem";

class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.setBudgetItems(this.props.match.params.id);
    this.props.setUser();
  }
  // HOC
  withBudgetData = (WrappedComponent, data) => {
    return <WrappedComponent data={data} />;
  };
  render() {
    let { budgetItems, user, colors } = this.props;
    let addBudgetItem = this.withBudgetData(AddBudgetItem, { ...this.props });
    let mappedBudgetItems =
      budgetItems && budgetItems.map(item => <BudgetItem {...item} />);
    return (
      <div>
        Budget Container
        {this.props.match.path == "/:id" && (
          <React.Fragment>
            <PieChart budgetItems={budgetItems} />
            {mappedBudgetItems}
          </React.Fragment>
        )}
        {this.props.match.path == "/budget/create" && addBudgetItem})
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  let { budgetItems, colors } = state.budget;
  let { user } = state.user;
  return {
    budgetItems,
    colors,
    user
  };
};
const mapDispatchToProps = {
  setBudgetItems,
  setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContainer);
