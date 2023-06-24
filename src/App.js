import { useState, useEffect } from "react";
import InputBox from "./components/input-box/input-box.component";
import Items from "./components/items/items.component";

import "./App.css";

function App() {
  let data = JSON.parse(localStorage.getItem("todoitems"));
  let tempId;
  !data
    ? (data = [])
    : (tempId = !isNaN(data.at(-1)?.id) ? data.at(-1)?.id : 0);
  tempId++;
  //! Use state to set values
  const [todo, setTodo] = useState(data);
  let [id, setId] = useState(tempId);
  const [time, setTime] = useState("");

  const temp = [...todo];
  const checkboxEl = document.querySelectorAll(".item__checkbox");
  const listItemEl = document.querySelectorAll(".list__item");
  const itelTextEl = document.querySelectorAll(".item__text");

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

    if (inputValue.length < 3) {
      document.querySelector(".input").value = "";
      return alert("Enter a valid activity");
    }
    const temp = [...todo, { id, inputValue, date: time, checked: false }];
    ++id;
    setId(id);
    document.querySelector(".input").value = "";
    return setTodo(temp);
  };
  //* Helper Function(Find Index)
  const findIndex = function (e) {
    const btnParentEl = e.target.closest(".list__item");
    const todoId = +btnParentEl.dataset.itemId;
    return temp.findIndex((item) => item.id === todoId);
  };

  //! Check if checkbox is checked or not
  const _setCheckboxValue = (e, value) => {
    const index = findIndex(e);
    temp[index].checked = value;
    setTodo(temp);
  };

  setTimeout(() => {
    checkboxEl.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.target.checked
          ? _setCheckboxValue(e, true)
          : _setCheckboxValue(e, false);
      });
    });

    temp.forEach((item, i) => {
      item.checked
        ? listItemEl[i]
            ?.querySelector(".item__checkbox")
            .setAttribute("checked", true)
        : listItemEl[i]
            ?.querySelector(".item__checkbox")
            .removeAttribute("checked");
    });

    function _taskComplete(i, opacity, decoration) {
      listItemEl[i].style.transition = "all .3s";
      listItemEl[i].style.opacity = opacity;
      itelTextEl[i].style.textDecoration = decoration;
    }

    checkboxEl.forEach((checkBox, i) => {
      if (checkBox.checked) {
        _taskComplete(i, 0.6, "line-through");
      } else {
        _taskComplete(i, 1, "none");
      }
    });

    //*list style on hover
    function _listAnimation(e, times) {
      e.target.style.transition = "all .3s";
      e.target.style.transform = `scale(${times})`;
    }

    //!IIFE(Immediately invoked function expression)
    (function () {
      listItemEl?.forEach((list, i) => {
        list.addEventListener("mouseenter", (e) => {
          _listAnimation(e, 0.99);
        });
        list.addEventListener("mouseleave", (e) => {
          _listAnimation(e, 1);
        });
      });
    })();
  }, 500);

  //!Delete item handler

  const deleteItem = (e) => {
    const index = findIndex(e);
    temp.splice(index, 1);
    return setTodo(temp);
  };

  //!Edit Item Handler
  const editItem = (e) => {
    const index = findIndex(e);
    const currentValue = itelTextEl[index].textContent;
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
        />
      </div>
    </div>
  );
}

export default App;
