import React from "react";
import { onlineMode } from "../../redux/reducer";

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
    toggleColors,
    onlineMode,
    online,
    cancelEditMode
  } = props.data;
  window.addEventListener("offline", function(e) {
    e.preventDefault();
    onlineMode();
    // console.log(online);
  });
  window.addEventListener("online", function(e) {
    e.preventDefault();
    onlineMode();
    // console.log(online);
  });
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
  console.log(online);
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="inputs">
        {editing && (
          <React.Fragment>
            <button onClick={() => cancelEditMode(history, user.id)}>
              Cancel
            </button>
            <br />
          </React.Fragment>
        )}
        <label>Title</label>
        <input
          name="title"
          placeholder="Ex. Groceries"
          onChange={handleChange}
          value={title || ""}
        />
        <label>Amount</label>
        <input
          name="amount"
          type="number"
          placeholder="Ex. 300"
          onChange={handleChange}
          value={amount || ""}
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
      {editing && online ? (
        <React.Fragment>
          <button
            className="submit-button"
            onClick={() =>
              editItem(editing, user.id, title, selectedColor, amount, history)
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
            handleCreate(title, amount, selectedColor, history, user.id)
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
