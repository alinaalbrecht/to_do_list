/* eslint-disable import/prefer-default-export */
import {
  toDoListArray,
  createToDo,
  addToList,
  completeToDo,
} from './createToDo';

function clearInputs(input) {
  return (input.value = '');
}

function renderToDoList(listArray) {
  let toDoList = document.querySelector('.main-content__to-do-list');
  let counter = 0;
  const toDoListMarkup = listArray.map(
    (item) => `
      <div class="to-do-list__todo-item">
      <input
        class="todo-item__checkbox"
        type="checkbox"
        id="${item.name}"
        name="checkbox"
        data-index="${counter++}"
        value="${item.name}"
      />
      <label class="todo-item__name" for="${item.name}">${item.name}</label>
    </div>
          `
  );
  toDoList.innerHTML = toDoListMarkup.join('');
}

function renderCompletedList(listArray) {
  let completedList = document.querySelector('.completed');
  let counter = 0;
  const completedListMarkup = listArray.map(
    (item) => `
      
      <div class="completed-list__todo-item">
      <input
        class="todo-item__checkbox"
        type="checkbox"
        disabled="disabled"
        id="${item.name}"
        name="checkbox"
        data-index="${counter++}"
        value="${item.name}"
      />
      <label class="completed-list__name" for="${item.name}">${
      item.name
    }</label>
    </div>
          `
  );
  completedList.innerHTML = completedListMarkup.join('');
}

function totalToDos(listArray) {
  let total = document.querySelector('[data-type="total-to-dos"]');
  total.textContent = listArray.length;
}

export { clearInputs, renderToDoList, totalToDos, renderCompletedList };
