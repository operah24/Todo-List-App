const container = document.querySelector(".container");
var inputValue = document.querySelector(".input");
const add = document.querySelector(".add");

let todos;

if (window.localStorage.getItem("todos") === undefined) {
  todos = [];
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
todos = JSON.parse(todosEX);


class item {
  constructor(name) {
    this.createItem(name);
  }
  

  createItem(name) {
    var itemBox = document.createElement("div");
    itemBox.classList.add("item");

    var input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    input.value = name;
    input.classList.add("item_input");

    var edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "EDIT";
    edit.addEventListener("click", () => this.edit(input, name));

    var remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = "REMOVE";
    remove.addEventListener("click", () => this.remove(itemBox, name));

    var check = document.createElement("button");
    check.classList.add("check");
    check.innerHTML = "CHECK";
    check.addEventListener("click", () => this.toggleTodo(itemBox));

    container.appendChild(itemBox);
    itemBox.appendChild(check);
    itemBox.appendChild(input);
    itemBox.appendChild(edit);
    itemBox.appendChild(remove);
  }

  toggleTodo(itemBox) {
    const todoItem = itemBox.querySelector(".item_input");

    if (todoItem.classList.contains("checked")) {
      todoItem.classList.remove("checked");
      itemBox.querySelector(".check").textContent = "CHECK";
    } else {
      todoItem.classList.add("checked");
      itemBox.querySelector(".check").textContent = "UNCHECK";
    }
  }

  edit(input, name) {
    if (input.disabled === true) {
      input.disabled = !input.disabled;
    } else {
      input.disabled = !input.disabled;
      let indexof = todos.indexOf(name);
      todos[indexof] = input.value;
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  remove(itemBox, name) {
    itemBox.parentNode.removeChild(itemBox);
    let index = todos.indexOf(name);
    todos.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
}

add.addEventListener("click", addItem);
window.addEventListener("keydown", (e) => {
  if (e.which === 13) {
    addItem();
  }
});

function addItem() {
  if (inputValue.value !== "") {
    new item(inputValue.value);
    todos.push(inputValue.value);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    inputValue.value = "";
  }
}



for (var v = 0; v < todos.length; v++) {
  new item(todos[v]);
}

function toggleTodo(itemBox){
    const todoItem = itemBox.querySelector(".item_input");

    if (todoItem.classList.contains("checked")) {
      todoItem.classList.remove("checked");
      itemBox.querySelector(".check").textContent = "CHECK";
    } else {
      todoItem.classList.add("checked");
      itemBox.querySelector(".check").textContent = "UNCHECK";
    }
}
