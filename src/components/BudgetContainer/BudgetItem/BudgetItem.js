import React from "react";
import "./budget-item.scss";
import HorizontalBarChart from "../../Charts/HorizontalBarChart";

const BudgetItem = props => {
  return (
    <div id="budget-item">
      <h1>{props.itemTitle}</h1>
      {/* {parseInt(props.itemSpent) !== 0 ? <p>{Math.ceil((props.itemSpent / props.itemAmount) * 100)}%</p> : <p> </p>} */}
      {parseInt(props.itemSpent) == 0 ? <p>${props.itemAmount}</p> : <p>${props.itemSpent} / ${props.itemAmount}</p>}
      <button onClick={() => props.editMode(props.history, props.itemId)}>
        &#9998;
      </button>
      <div className="hBarChart">
        <HorizontalBarChart {...props} />
        {props.itemspent == 0 && Math.ceil((props.itemSpent / props.itemAmount) * 100) >= 90 && <>&#9888;</>}
      </div>
    </div>
  );
};

export default BudgetItem;
