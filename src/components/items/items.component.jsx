import "./items.css";

const Items = ({ todoItem, deleteHandler }) => {
  return (
    <div className="items__container">
      <ul className="list">
        {todoItem.map((item) => {
          return (
            <li key={item.id} data-item-id={item.id} className="list__item">
              <input
                type="checkbox"
                className="item__checkbox"
                data-check-tick={item.id}
                id={`checkBox--${item.id}`}
              />
              <label
                htmlFor={`checkBox--${item.id}`}
                className="fake__checkbox"
              ></label>
              <p className="item__text">{item.inputValue}</p>
              <div className="content__remove_box">
                <p className="item__date">{item.date}</p>
                <button className="btn btn__delete" onClick={deleteHandler}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Items;
