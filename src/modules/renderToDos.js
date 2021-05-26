/* eslint-disable import/prefer-default-export */
import {
  toDoListArray,
  createToDo,
  updateToDoList,
  completeToDo,
  checkDueDate,
  saveToDoList,
  changeDueDate,
} from './createToDo';

function clearInputs(input) {
  input.value = '';
}

function renderToDoList(listArray) {
  let toDoList = document.querySelector('.main-content__to-do-list');

  const toDoListMarkup = [];

  for (let i = 0; i < listArray.length; i++) {
    if (listArray[i].overdue === true) {
      toDoListMarkup.push(
        `<div class="to-do-list__todo-item" data-index="${i}">

        <div class="todo-item__checkbox" id="${
          listArray[i].name
        }" data-index="${i}"></div>
        <p class="todo-item__name">${listArray[i].name}</p>

        <p class="todo-item__due-date--set-date overdue" data-index="${i}">${
          listArray[i].dueDate !== 'no due date'
            ? listArray[i].dueDate.split('-').reverse().join('.')
            : listArray[i].dueDate
        }</p>
        <input class="todo-item__due-date--picker hidden" data-index="${i}" type="date" name="date">
        </div>`
      );
    } else {
      toDoListMarkup.push(
        `<div class="to-do-list__todo-item" data-index="${i}">

        <div class="todo-item__checkbox" id="${
          listArray[i].name
        }" data-index="${i}"></div>
        <p class="todo-item__name">${listArray[i].name}</p>
        <p class="todo-item__due-date--set-date not-overdue" data-index="${i}">${
          listArray[i].dueDate !== 'no due date'
            ? listArray[i].dueDate.split('-').reverse().join('.')
            : listArray[i].dueDate
        }</p>
        <input class="todo-item__due-date--picker hidden" data-index="${i}" type="date" name="date">
        </div>`
      );
    }
  }
  toDoList.innerHTML = toDoListMarkup.join('');
}

let setDates = document.querySelector('.main-content__to-do-list');
setDates.addEventListener('click', toggleDatePicker);

let datePickers = document.querySelectorAll('.main-content__to-do-list');
datePickers.forEach((picker) =>
  picker.addEventListener('focusout', removeDatePicker)
);

function toggleDatePicker(e) {
  const toggle = e.target;
  const setDate = 'todo-item__due-date--set-date';

  if (toggle.classList.contains(setDate)) {
    toggle.nextSibling.nextElementSibling.classList.remove('hidden');
    toggle.classList.add('hidden');
  }
}

function removeDatePicker(e) {
  const toggle = e.target;
  if (toggle.classList.contains('todo-item__due-date--picker')) {
    toggle.previousSibling.previousElementSibling.classList.remove('hidden');
    toggle.classList.add('hidden');
    checkDueDate();
    renderToDoList(toDoListArray);
    saveToDoList();
  }
}

function renderCompletedList(listArray) {
  let completedList = document.querySelector('.completed');
  let title = document.querySelector('.completed-list__title');
  let counter = 0;
  const completedListMarkup = listArray.map(
    (item) => `
      <div class="completed-list__todo-item">
      <i class="fas fa-check"></i>

      <span class="completed-list__name">${item.name}</span>
    </div>
          `
  );

  completedList.innerHTML = completedListMarkup.join('');
  if (
    [...completedList.children].length > 0 &&
    title.classList.contains('hidden')
  ) {
    title.classList.remove('hidden');
  }
}

function totalToDos(listArray) {
  let total = document.querySelector('[data-type="total-to-dos"]');
  total.textContent = `(${listArray.length})`;
}

export {
  clearInputs,
  renderToDoList,
  totalToDos,
  renderCompletedList,
  toggleDatePicker,
  removeDatePicker,
};
