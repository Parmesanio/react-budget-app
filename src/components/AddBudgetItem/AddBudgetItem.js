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
    user,
    editing,
    editItem
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
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={title}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        value={amount}
      />
      <p>
        Current Color:{" "}
        <button
          className="options"
          name="selectedColor"
          style={{ background: selectedColor }}
        />
      </p>
      <div className="options">{mappedColors}</div>
      {editing !== 0 ? (
        <button
          onClick={() =>
            editItem(editing, user.id, title, selectedColor, amount)
          }
        >
          Edit Item
        </button>
      ) : (
        <button
          onClick={() =>
            handleCreate(title, amount, selectedColor, history, user.id)
          }
        >
          Add to tracker
        </button>
      )}
    </form>
  );
};

export default AddBudgetItem;
