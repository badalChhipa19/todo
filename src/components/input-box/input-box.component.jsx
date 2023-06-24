import { BiPlus } from "react-icons/bi";
import "./input-box.css";

const InputBox = ({ addTodoHandler, todoItems, time, deleteAllHandler }) => {
  return (
    <div className="add__item_container">
      <form className="input__box" onSubmit={addTodoHandler}>
        <label htmlFor="addItem" className="label">
          <BiPlus className="add__icon" />
        </label>
        <input
          type="text"
          id="addItem"
          className="input"
          placeholder="Start with you list....."
        />
        <input type="submit" value="Add" className="btn btn__add" />
      </form>

      <div className="delete__all_container">
        <p className="time">{time}</p>
        {todoItems.length > 1 ? (
          <button className="btn btn__delete_all" onClick={deleteAllHandler}>
            Delete All
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InputBox;
