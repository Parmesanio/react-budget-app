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
    handleDelete,
    history,
    user,
    editing,
    editItem,
    toggleColors
  } = props.data;

  let mappedColors =
    colors &&
    colors.map((color, i) => (
      <button
        onClick={handleChange}
        name="selectedColor"
        value={color}
        style={{ background: color }}
      />
    ));
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="inputs">
        <label>Title</label>
        <input
          name="title"
          placeholder="Ex. Groceries"
          onChange={handleChange}
          value={title}
        />
        <label>Amount</label>
        <input
          name="amount"
          type="number"
          placeholder="Ex. 300"
          onChange={handleChange}
          value={amount}
        />
        <label>Color</label>
        <button
          onClick={handleChange}
          name="selectedColor"
          style={{ background: selectedColor }}
        />
      </div>
      <div className={`${toggleColors ? "options" : "hidden"}`}>
        {mappedColors}
      </div>
      {editing ? (
        <React.Fragment>
          <button
            className="submit-button"
            onClick={() =>
              editItem(editing, user.id, title, selectedColor, amount)
            }
          >
            Edit Item
          </button>
          <button
            className="delete-item"
            onClick={() =>
              handleDelete(editing, user.id, title, selectedColor, amount)
            }
          >
            Delete Item
          </button>
        </React.Fragment>
      ) : (
        <button
          className="submit-button"
          onClick={() =>
            handleCreate(title, amount, selectedColor, history, user.id)
          }
        >
          Add
        </button>
      )}
    </form>
  );
};

export default AddBudgetItem;
