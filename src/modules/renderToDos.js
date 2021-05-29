/* eslint-disable import/prefer-default-export */
import {
  toDoListArray,
  createToDo,
  updateToDoList,
  completeToDo,
  checkDueDate,
  saveToDoList,
  changeDueDate,
  folderArray,
  activateFolder,
  currentFolder,
} from './createToDo';

function clearInputs(input) {
  input.value = '';
}

function renderToDoList(listArray, folder) {
  const toDoList = document.querySelector('.main-content__to-do-list');
  const folderToDoList = listArray.filter((item) => item.folder === folder);
  totalToDos(folderToDoList);
  const toDoListMarkup = [];

  for (let i = 0; i < folderToDoList.length; i++) {
    if (folderToDoList[i].overdue === true) {
      toDoListMarkup.push(
        `<div class="to-do-list__todo-item" data-index="${i}">

        <div class="todo-item__checkbox" id="${
          folderToDoList[i].name
        }" data-index="${i}"></div>
        <p class="todo-item__name">${folderToDoList[i].name}</p>

        <p class="todo-item__due-date--set-date overdue" data-index="${i}">${
          folderToDoList[i].dueDate !== 'no due date'
            ? folderToDoList[i].dueDate.split('-').reverse().join('.')
            : folderToDoList[i].dueDate
        }</p>
        <input class="todo-item__due-date--picker hidden" data-index="${i}" type="date" name="date">
        </div>`
      );
    } else {
      toDoListMarkup.push(
        `<div class="to-do-list__todo-item" data-index="${i}">

        <div class="todo-item__checkbox" id="${
          folderToDoList[i].name
        }" data-index="${i}"></div>
        <p class="todo-item__name">${folderToDoList[i].name}</p>
        <p class="todo-item__due-date--set-date not-overdue" data-index="${i}">${
          folderToDoList[i].dueDate !== 'no due date'
            ? folderToDoList[i].dueDate.split('-').reverse().join('.')
            : folderToDoList[i].dueDate
        }</p>
        <input class="todo-item__due-date--picker hidden" data-index="${i}" type="date" name="date">
        </div>`
      );
    }
  }
  toDoList.innerHTML = toDoListMarkup.join('');
}

function renderFolderList(listArray) {
  const folders = document.querySelector('.folder-sidebar__folder-list');
  const folderListMarkup = [];
  for (let i = 0; i < listArray.length; i++) {
    folderListMarkup.push(`
    <div class="folder" data-index="${i}">
    <span class="folder__name" data-index="${i}">${listArray[i]}</span>
    <span class="folder__amount"></span>
  </div>`);
  }
  folders.innerHTML = folderListMarkup.join('');
}

function renderFolderStyling(folder, target) {
  const folderTitle = document.querySelector('.folder-title');
  folderTitle.textContent = folder;

  const folders = [...document.querySelectorAll('.folder')];
  folders.forEach((item) => item.classList.remove('folder--active'));
  target.parentElement.classList.add('folder--active');
}

const setDates = document.querySelector('.main-content__to-do-list');
setDates.addEventListener('click', toggleDatePicker);

const datePickers = document.querySelectorAll('.main-content__to-do-list');
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
    renderToDoList(toDoListArray, currentFolder);
    saveToDoList();
  }
}

function renderCompletedList(listArray, folder) {
  const completedList = document.querySelector('.completed');
  const folderCompletedList = listArray.filter(
    (item) => item.folder === folder
  );
  const title = document.querySelector('.completed-list__title');
  const completedListMarkup = folderCompletedList.map(
    (item) => `
      <div class="completed-list__todo-item">
      <i class="fas fa-check"></i>

      <span class="completed-list__name">${item.name}</span>
    </div>`
  );

  completedList.innerHTML = completedListMarkup.join('');
  if (folderCompletedList.length > 0 && title.classList.contains('hidden')) {
    title.classList.remove('hidden');
  }
}

let addButton = document.querySelector('.add-project');
addButton.addEventListener('click', showFolderInput);

function showFolderInput() {
  const folders = document.querySelector('.folder-sidebar__folder-list');
  const folderInputField = document.createElement('input');
  folderInputField.classList.add('add-folder__input');
  folderInputField.setAttribute('type', 'text');
  folderInputField.setAttribute('placeholder', 'create a new project');
  folders.append(folderInputField);
}

function totalToDos(listArray) {
  const total = document.querySelector('[data-type="total-to-dos"]');
  total.textContent = `(${listArray.length})`;
}

export {
  clearInputs,
  renderToDoList,
  totalToDos,
  renderCompletedList,
  toggleDatePicker,
  removeDatePicker,
  renderFolderList,
  showFolderInput,
  renderFolderStyling,
};
