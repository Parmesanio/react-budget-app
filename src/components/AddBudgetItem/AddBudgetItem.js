import React from "react";

const AddBudgetItem = props => {
  console.log(props);

  let mappedColors =
    props.data.colors &&
    props.data.colors.map((color, i) => (
      <button className="options" style={{ background: color }} />
    ));
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input placeholder="Title" />
      <input type="number" placeholder="Amount" />
      <div className="options">{mappedColors}</div>
      <button>Add to tracker</button>
    </form>
  );
};

export default AddBudgetItem;
