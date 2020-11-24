// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


// Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  //   console.log("asalamo alaykom");

  if (todoInput.value) {
    //   to-do Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //   create list item
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    // add todo to localStorage 
    saveLocalTodos(todoInput.value);
    

    //   check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //   trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");

    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  }

  //   append to list

  // clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // delete todo

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // check mark

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e){

  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (e.target.value){
      case "all":
        todo.style.display = 'flex';
        break;
        case "completed":
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            
            todo.style.display = 'none';
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            
            todo.style.display = 'none';
          }
          break;
    }
  });
}

function saveLocalTodos(todo) {
  // check --- 
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));

  }
  todos.push(todo); 
  localStorage.setItem('todos', JSON.stringify(todos));

  
}
