import { useState, useEffect } from "react";
import InputBox from "./components/input-box/input-box.component";
import Items from "./components/items/items.component";

import "./App.css";

//! Helpers
const findParent = (e, className) => {
  return e.target.closest(className);
};

const toggleClasses = (target, passedMethod, className) => {
  return target.classList[passedMethod](className);
};

//* Helper Function(Find Index)
const findItemIndex = function (e, todo) {
  const btnParentEl = e.target.closest(".list__item");
  const todoId = +btnParentEl.dataset.itemId;
  return todo.findIndex((item) => item.id === todoId);
};

//TODO: **************************************************************************
function App() {
  let data = JSON.parse(localStorage.getItem("todoitems"));
  let tempId;
  !data ? (data = []) : (tempId = data.at(-1)?.id ? data.at(-1)?.id : 0);
  tempId++;

  //! Use state to set values
  const [todo, setTodo] = useState(data);
  let [id, setId] = useState(tempId);
  const [time, setTime] = useState("");

  const temp = [...todo];
  const checkboxEl = document.querySelectorAll(".item__checkbox");
  const listItemEl = document.querySelectorAll(".list__item");
  const itemTextEl = document.querySelectorAll(".item__text");

  //! send Data to Loacal Storage
  useEffect(() => {
    localStorage.setItem("todoitems", JSON.stringify(todo));
  }, [todo]);

  //! set time
  useEffect(() => {
    const data = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    setTime(data + "/" + month + "/" + year);
  }, [time]);

  //! Add new Item in todo handler
  const addTodoItem = (e) => {
    e.preventDefault();
    const inputValue = document.querySelector(".input").value;

    if (inputValue === "") return;
    if (inputValue.length < 3) {
      document.querySelector(".input").value = "";
      return alert("Enter a valid activity");
    }
    const temp = [...todo, { id, inputValue, date: time, checked: false }];
    setId(++id);
    document.querySelector(".input").value = "";
    return setTodo(temp);
  };

  //! Check if checkbox is checked or not
  const checkboxEventHandle = (e) => {
    const parentEl = findParent(e, ".list__item");
    const text = parentEl.querySelector(".item__text");
    const checkBox = e.target;
    const index = findItemIndex(e, todo);
    if (checkBox.checked) {
      toggleClasses(parentEl, "add", "list__after_checked");
      toggleClasses(text, "add", "item__checked");
      temp.at(index).checked = true;
      return setTodo(temp);
    }
    toggleClasses(text, "remove", "item__checked");
    toggleClasses(parentEl, "remove", "list__after_checked");
    temp.at(index).checked = false;
    return setTodo(temp);
  };

  //! IFFE: check if checked or not
  (function checkedOrNot() {
    //TODO: checkBox update
    checkboxEl.forEach((el) => {
      const itemId = +el.dataset.checkTick;
      todo.forEach((item) => {
        if (item.id === itemId) {
          return (el.checked = item.checked);
        }
      });
    });

    //TODO: item style
    listItemEl.forEach((item) => {
      const itemId = +item.dataset.itemId;
      const text = item.querySelector(".item__text");
      todo.forEach((el) => {
        if (el.id === itemId) {
          if (el.checked) {
            toggleClasses(item, "add", "list__after_checked");
            toggleClasses(text, "add", "item__checked");
          }
        }
      });
    });
  })();

  //!Delete item handler

  const deleteItem = (e) => {
    const index = findItemIndex(e, todo);
    temp.splice(index, 1);
    return setTodo(temp);
  };

  //!Edit Item Handler
  const editItem = (e) => {
    const index = findItemIndex(e, todo);
    const currentValue = itemTextEl[index].textContent;
    document.querySelector(".input").value = currentValue;
    temp.splice(index, 1);
    return setTodo(temp);
  };

  //!delete All
  const deleteAllItems = () => {
    const temp = [];
    setTodo(temp);
  };

  //! Return
  return (
    <div className="App">
      <div className="todo__container">
        <header className="header">
          <h1 className="heading__primary">What ToDo</h1>
          <InputBox
            addTodoHandler={addTodoItem}
            deleteAllHandler={deleteAllItems}
            time={time}
            todoItems={todo}
          />
        </header>
        <Items
          todoItem={todo}
          deleteHandler={deleteItem}
          editHandler={editItem}
          checkboxEventHandler={checkboxEventHandle}
        />
      </div>
    </div>
  );
}

export default App;
