/* eslint-disable import/prefer-default-export */
import {
  toDoListArray,
  createToDo,
  addToList,
  completeToDo,
  checkDueDate,
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
      <input class="todo-item__due-date" type="date" value="${
        item.dueDate
      }" name="date" />
      </div>
          `
  );
  toDoList.innerHTML = toDoListMarkup.join('');
  checkDueDate();
}

function renderCompletedList(listArray) {
  console.log('trigger');
  let completedList = document.querySelector('.completed');
  let title = document.querySelector('.completed-list__title');
  if (title.classList.contains('hidden')) {
    title.classList.remove('hidden');
  }
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
