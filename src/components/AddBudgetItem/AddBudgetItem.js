import React from "react";
import { onlineMode } from "../../redux/reducer";

const AddBudgetItem = props => {
  console.log(props);
  let {
    title,
    amount,
    spent,
    selectedColor,
    colors,
    handleChange,
    handleCreate,
    handleDelete,
    history,
    user,
    editing,
    editItem,
    toggleColors,
    onlineMode,
    online,
    cancelEditMode
  } = props.data;
  let mappedColors =
    colors &&
    colors.map((color, i) => (
      <button
        key={i}
        onClick={handleChange}
        name="selectedColor"
        value={color || ""}
        style={{ background: color }}
      />
    ));
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="inputs">
        {editing ? (
          <React.Fragment>
            <button onClick={() => cancelEditMode(history, user.id)}>
              Cancel
            </button>
            <br />
          </React.Fragment>
        ) : null}
        <label>Title *</label>
        <input
          name="title"
          placeholder="Ex. Groceries"
          onChange={handleChange}
          value={title || ""}
        />
        <label>Amount Spent (Optional)</label>
        <input
          name="spent"
          type="number"
          placeholder="Ex. 300"
          onChange={handleChange}
          value={spent || ""}
        />
        <label>Total *</label>
        <input
          name="amount"
          type="number"
          placeholder="Ex. 300"
          onChange={handleChange}
          value={amount || ""}
        />
        <label>Color *</label>
        <button
          onClick={handleChange}
          name="selectedColor"
          style={{ background: selectedColor }}
        />
      </div>
      <div className={`${toggleColors ? "options" : "hidden"}`}>
        {mappedColors}
      </div>
      {editing && online ? (
        <React.Fragment>
          <button
            className="submit-button"
            onClick={() =>
              editItem(editing, user.id, title, selectedColor, amount, spent, history)
            }
          >
            Edit Item
          </button>
          <button
            className="delete-item"
            onClick={() => handleDelete(editing, user.id, history)}
          >
            Delete Item
          </button>
        </React.Fragment>
      ) : online ? (
        <button
          className="submit-button"
          onClick={() =>
            handleCreate(title, amount, spent, selectedColor, history, user.id)
          }
        >
          Add
        </button>
      ) : (
            "You are currently offline."
          )}
    </form>
  );
};

export default AddBudgetItem;
