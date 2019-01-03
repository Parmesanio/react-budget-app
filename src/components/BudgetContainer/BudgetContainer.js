import React, { Component } from "react";
import PieChart from "./PieChart/PieChart";
import { connect } from "react-redux";
import { setBudgetItems } from "../../redux/reducer";
import BudgetItem from "./BudgetItem/BudgetItem";

class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.setBudgetItems(this.props.match.params.id);
  }
  render() {
    console.log(this.props.budgetItems);
    let mappedBudgetItems =
      this.props.budgetItems &&
      this.props.budgetItems.map(item => <BudgetItem {...item} />);
    return (
      <div>
        Budget Container
        <PieChart budgetItems={this.props.budgetItems} />
        {mappedBudgetItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { budgetItems } = state.budget;
  return {
    budgetItems
  };
};
const mapDispatchToProps = {
  setBudgetItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContainer);
