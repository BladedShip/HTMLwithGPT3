// Get references to the necessary elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Get the to-do items from local storage, or an empty array if none exist
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Add a new to-do item to the list and local storage
function addTodo() {
  const todoText = todoInput.value;
  if (todoText === '') return;

  const todo = { text: todoText, done: false };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Render the to-do items to the page
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (todo.done) {
      todoItem.classList.add('done');
    }
    todoItem.innerHTML = `
      <span>${todo.text}</span>
      <button data-index="${index}" class="remove-todo">Remove</button>
      <button data-index="${index}" class="mark-done">Done</button>
    `;
    todoList.appendChild(todoItem);
  });
}

// Mark a to-do item as done
function markDone(index) {
  todos[index].done = true;
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Remove a to-do item
function removeTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Add event listeners
addTodoBtn.addEventListener('click', event => {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener('click', event => {
  if (event.target.classList.contains('remove-todo')) {
    const index = event.target.dataset.index;
    removeTodo(index);
  }
  if (event.target.classList.contains('mark-done')) {
    const index = event.target.dataset.index;
    markDone(index);
  }
});

// Render the initial to-do list
renderTodos();
