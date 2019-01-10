import React from "react";
import "./budgetform.scss";

const BudgetForm = props => {
  console.log(props);
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="inputs">
        <label>Budget</label>
        <input
          onChange={props.data.handleChange}
          name="budget"
          type="number"
          placeholder={(props.data.user && props.data.user.budget) || 0}
        />
      </div>
      <button onClick={() => props.data.setBudgetAmount(props.data.budget)}>
        Save
      </button>
    </form>
  );
};

export default BudgetForm;
