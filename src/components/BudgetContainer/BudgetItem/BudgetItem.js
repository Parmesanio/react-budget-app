import React from "react";
import "./budget-item.scss";

const BudgetItem = props => {
  console.log(props);
  return (
    <div id="budget-item">
      <h1>{props.itemTitle}</h1>
      <p>{Math.ceil((props.itemAmount / props.user.budget) * 100)}%</p>
      <p>{props.itemAmount}</p>
      <button onClick={() => props.editMode(props.history, props.itemId)}>
        Edit
      </button>
      <button
        onClick={() =>
          props.handleDelete(
            props.itemId,
            props.user.id,
            props.itemTitle,
            props.itemColor,
            props.itemAmount
          )
        }
      >
        X
      </button>
    </div>
  );
};

export default BudgetItem;
