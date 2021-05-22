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

  const toDoListMarkup = [];

  for (let i = 0; i < listArray.length; i++) {
    if (listArray[i].overdue === true) {
      toDoListMarkup.push(
        `<div class="to-do-list__todo-item">
        <input
          class="todo-item__checkbox"
          type="checkbox"
          id="${listArray[i].name}"
          name="checkbox"
          data-index="${i}"
          value="${listArray[i].name}"
        />
        <label class="todo-item__name" for="${listArray[i].name}">${listArray[i].name}</label>
        <input class="todo-item__due-date overdue" type="date" value="${listArray[i].dueDate}" name="date" /></div>`
      );
    } else {
      toDoListMarkup.push(
        `<div class="to-do-list__todo-item">
        <input
          class="todo-item__checkbox"
          type="checkbox"
          id="${listArray[i].name}"
          name="checkbox"
          data-index="${i}"
          value="${listArray[i].name}"
        />
        <label class="todo-item__name" for="${listArray[i].name}">${listArray[i].name}</label>
        <input class="todo-item__due-date" type="date" value="${listArray[i].dueDate}" name="date" /></div>`
      );
    }
  }
  toDoList.innerHTML = toDoListMarkup.join('');
}

function renderCompletedList(listArray) {
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
  total.textContent = `(${listArray.length})`;
}

export { clearInputs, renderToDoList, totalToDos, renderCompletedList };
