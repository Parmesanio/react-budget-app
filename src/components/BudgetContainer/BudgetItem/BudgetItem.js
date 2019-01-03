import React from "react";
import "./budget-item.scss";

const BudgetItem = props => {
  return (
    <div id="budget-item">
      <h1>{props.title}</h1>
      <p>{props.amount}</p>
    </div>
  );
};

export default BudgetItem;
