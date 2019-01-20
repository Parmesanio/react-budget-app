import React from "react";
import "./budget-item.scss";

const BudgetItem = props => {
  return (
    <div id="budget-item">
      <h1>{props.itemTitle}</h1>
      <p>{Math.ceil((props.itemAmount / props.user.budget) * 100)}%</p>
      <p>${props.itemAmount}</p>
      <button onClick={() => props.editMode(props.history, props.itemId)}>
        &#9998;
      </button>
    </div>
  );
};

export default BudgetItem;
