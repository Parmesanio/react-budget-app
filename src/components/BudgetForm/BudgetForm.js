import React from "react";

const BudgetForm = props => {
  console.log(props);
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        onChange={props.data.handleChange}
        name="budget"
        type="number"
        placeholder="Monthly Budget"
      />
      <button onClick={() => props.data.setBudgetAmount(props.data.budget)}>
        Submit
      </button>
    </form>
  );
};

export default BudgetForm;
