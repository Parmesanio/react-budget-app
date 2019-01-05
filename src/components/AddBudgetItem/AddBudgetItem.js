import React from "react";

const AddBudgetItem = props => {
  console.log(props);
  let {
    title,
    amount,
    selectedColor,
    colors,
    handleChange,
    handleCreate,
    history,
    user
  } = props.data;

  let mappedColors =
    colors &&
    colors.map((color, i) => (
      <button
        onClick={handleChange}
        className="options"
        name="selectedColor"
        value={color}
        style={{ background: color }}
      />
    ));
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
      />
      <div className="options">{mappedColors}</div>
      <button
        onClick={() =>
          handleCreate(title, amount, selectedColor, history, user.id)
        }
      >
        Add to tracker
      </button>
    </form>
  );
};

export default AddBudgetItem;
